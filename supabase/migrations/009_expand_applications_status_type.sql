alter table applications drop constraint if exists applications_status_check;
alter table applications add constraint applications_status_check
  check (
    status in (
      'draft',
      'ready',
      'submitted',
      'processing',
      'approved',
      'rejected',
      'in_bearbeitung',
      'abgeschlossen'
    )
  );

alter table applications drop constraint if exists applications_type_check;
alter table applications add constraint applications_type_check
  check (
    type in (
      'wohngeld',
      'kindergeld',
      'bafoeg',
      'buergergeld',
      'kinderzuschlag',
      'elterngeld',
      'other',
      'abrechnung'
    )
  );
