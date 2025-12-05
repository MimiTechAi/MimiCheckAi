/**
 * PDF-FILL SERVICE
 * 
 * Funktionen:
 * 1. PDF-Formularfelder automatisch ausfüllen
 * 2. Ausgefülltes PDF generieren
 * 3. PDF flattening (nicht mehr editierbar)
 * 4. Wasserzeichen hinzufügen
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PdfParserService from './PdfParserService';

class PdfFillService {
  /**
   * Füllt PDF-Formular mit User-Daten aus
   */
  static async fillPdfForm(pdfFile, userData, options = {}) {
    try {
      // PDF laden
      const arrayBuffer = await PdfParserService.fileToArrayBuffer(pdfFile);
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();
      
      // Mapping erstellen
      const mappingResult = await PdfParserService.createFieldMapping(pdfFile, userData);
      
      if (!mappingResult.success) {
        throw new Error(mappingResult.error);
      }
      
      const filledFields = [];
      const errors = [];
      
      // Felder ausfüllen
      for (const mapping of mappingResult.mapping) {
        try {
          const field = form.getField(mapping.pdfField);
          const success = await this.fillField(field, mapping.userValue, mapping.pdfType);
          
          if (success) {
            filledFields.push({
              field: mapping.pdfField,
              value: mapping.userValue,
              label: mapping.label
            });
          }
        } catch (error) {
          errors.push({
            field: mapping.pdfField,
            error: error.message
          });
        }
      }
      
      // Optional: Flatten (nicht mehr editierbar)
      if (options.flatten) {
        form.flatten();
      }
      
      // Optional: Wasserzeichen
      if (options.watermark) {
        await this.addWatermark(pdfDoc, options.watermark);
      }
      
      // PDF als Bytes speichern
      const pdfBytes = await pdfDoc.save();
      
      return {
        success: true,
        pdfBytes,
        filledFields,
        errors,
        totalFields: mappingResult.totalFields,
        filledCount: filledFields.length,
        errorCount: errors.length,
        unmappedFields: mappingResult.unmappedFields
      };
      
    } catch (error) {
      console.error('PDF-Fill-Fehler:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Füllt einzelnes Feld
   */
  static async fillField(field, value, fieldType) {
    try {
      if (value === null || value === undefined) {
        return false;
      }
      
      switch (fieldType) {
        case 'text':
          field.setText(String(value));
          return true;
          
        case 'checkbox':
          if (value === true || value === 'true' || value === 1) {
            field.check();
          } else {
            field.uncheck();
          }
          return true;
          
        case 'radio':
          field.select(String(value));
          return true;
          
        case 'dropdown':
          field.select(String(value));
          return true;
          
        default:
          return false;
      }
    } catch (error) {
      console.error('Feld-Fill-Fehler:', error);
      return false;
    }
  }
  
  /**
   * Fügt Wasserzeichen hinzu
   */
  static async addWatermark(pdfDoc, watermarkText) {
    try {
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      for (const page of pages) {
        const { width, height } = page.getSize();
        
        // Wasserzeichen in der Mitte
        page.drawText(watermarkText, {
          x: width / 2 - 100,
          y: height / 2,
          size: 50,
          font,
          color: rgb(0.8, 0.8, 0.8),
          opacity: 0.3,
          rotate: { angle: 45, type: 'degrees' }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Wasserzeichen-Fehler:', error);
      return false;
    }
  }
  
  /**
   * Generiert Download-Link für PDF
   */
  static createDownloadLink(pdfBytes, filename = 'ausgefuellt.pdf') {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    return {
      url,
      filename,
      size: pdfBytes.length,
      sizeFormatted: this.formatBytes(pdfBytes.length)
    };
  }
  
  /**
   * Formatiert Bytes
   */
  static formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
  
  /**
   * Füllt PDF mit AI Unterstützung über Supabase Edge Function
   * SECURITY: API Keys werden NICHT im Frontend verwendet!
   */
  static async fillPdfWithAI(pdfFile, userData) {
    try {
      // Erst normale Befüllung
      const basicFill = await this.fillPdfForm(pdfFile, userData);
      
      if (!basicFill.success) {
        throw new Error(basicFill.error);
      }
      
      // Wenn unmapped fields existieren, über Edge Function AI fragen
      if (basicFill.unmappedFields.length > 0) {
        const aiSuggestions = await this.getAISuggestionsViaEdgeFunction(
          basicFill.unmappedFields,
          userData
        );
        
        // AI-Vorschläge anwenden
        if (aiSuggestions.success) {
          console.log('AI-Vorschläge:', aiSuggestions.suggestions);
        }
      }
      
      return basicFill;
      
    } catch (error) {
      console.error('AI-Fill-Fehler:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Holt AI-Vorschläge über sichere Supabase Edge Function
   * SECURITY: Keine API Keys im Frontend!
   */
  static async getAISuggestionsViaEdgeFunction(unmappedFields, userData) {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/fill-pdf-claude`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey
        },
        body: JSON.stringify({
          unmappedFields,
          userData
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'AI Service nicht verfügbar');
      }
      
      const data = await response.json();
      
      return {
        success: true,
        suggestions: data.suggestions || []
      };
      
    } catch (error) {
      console.error('AI-Suggestions-Fehler:', error);
      return {
        success: false,
        error: error.message,
        suggestions: []
      };
    }
  }
  
  /**
   * Batch-Befüllung mehrerer PDFs
   */
  static async fillMultiplePdfs(pdfFiles, userData, options = {}) {
    const results = [];
    
    for (const pdfFile of pdfFiles) {
      const result = await this.fillPdfForm(pdfFile, userData, options);
      results.push({
        filename: pdfFile.name,
        ...result
      });
    }
    
    return {
      success: true,
      results,
      totalPdfs: pdfFiles.length,
      successCount: results.filter(r => r.success).length,
      errorCount: results.filter(r => !r.success).length
    };
  }
  
  /**
   * Erstellt Vorschau-Bild von PDF
   */
  static async createPdfPreview(pdfBytes) {
    try {
      // TODO: Implementiere PDF-zu-Bild Konvertierung
      // Für jetzt: Placeholder
      return {
        success: true,
        previewUrl: null,
        message: 'Preview-Generierung noch nicht implementiert'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default PdfFillService;
