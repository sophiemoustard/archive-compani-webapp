export const TOKEN_EXPIRE_DAY = 1; // in days

export const IDENTIFICATION = 'identification';
export const CONTRACT_END = 'contract_end';

// MEDIA
export const BLUE_TEXT_LOGO = 'https://storage.googleapis.com/compani-main/icons/compani_texte_bleu.png';
export const DOC_EXTENSIONS = 'image/jpg, image/jpeg, application/pdf';
export const IMAGE_EXTENSIONS = 'image/jpg, image/jpeg, image/png';
export const VIDEO_EXTENSIONS = 'video/*';
export const AUDIO_EXTENSIONS = 'audio/*';
export const HTML_EXTENSIONS = '.html';

// CUSTOMER
export const MR = 'mr';
export const MRS = 'mrs';
export const CIVILITY_OPTIONS = [
  { label: 'Monsieur', value: MR },
  { label: 'Madame', value: MRS },
  { label: 'Monsieur / Madame', value: 'couple' },
];

// CUSTOMER FUNDING
export const MONTHLY = 'monthly';
export const ONCE = 'once';
export const FIXED = 'fixed';
export const HOURLY = 'hourly';

export const FUNDING_FREQ_OPTIONS = [
  { label: 'Mensuelle', value: MONTHLY },
  { label: 'Une seule fois', value: ONCE },
];
export const NATURE_OPTIONS = [
  { label: 'Horaire', value: HOURLY },
  { label: 'Forfaitaire', value: FIXED },
];

export const SURCHARGES = {
  saturday: 'Samedi',
  sunday: 'Dimanche',
  publicHoliday: 'Jours fériés',
  twentyFifthOfDecember: '25 décembre',
  firstOfMay: '1er mai',
  firstOfJanuary: '1er janvier',
  evening: 'Soirée',
  custom: 'Personnalisée',
};

// CUSTOMERS SITUATION
export const UNKNOWN = 'unknown';
export const HOME = 'home';
export const NURSING_HOME = 'nursing_home';
export const HOSPITALIZED = 'hospitalized';
export const DECEASED = 'deceased';
export const SITUATION_OPTIONS = [
  { label: 'Non renseigné', value: UNKNOWN },
  { label: 'Domicile', value: HOME },
  { label: 'EHPAD', value: NURSING_HOME },
  { label: 'Hospitalisé', value: HOSPITALIZED },
  { label: 'Décédé', value: DECEASED },
];

// CUSTOMER ABSENCE
export const CUSTOMER_ABSENCE = 'customer_absence';
export const LEAVE = 'leave';
export const HOSPITALIZATION = 'hospitalization';
export const OTHER = 'other';
export const CUSTOMER_ABSENCE_TYPES = [
  { label: 'Congés', value: LEAVE },
  { label: 'Hospitalisation', value: HOSPITALIZATION },
  { label: 'Autre', value: OTHER },
];

// CONTRACTS
export const CONTRACT = 'contract';
export const CONTRACT_VERSION = 'contract_version';
export const END_CONTRACT_REASONS = [
  { label: 'Rupture période d’essai employeur', value: 'employer_trial_period_termination' },
  { label: 'Rupture période d’essai salarié(e)', value: 'employee_trial_period_termination' },
  { label: 'Démission', value: 'resignation' },
  { label: 'Licenciement faute grave', value: 'serious_misconduct_layoff' },
  { label: 'Licenciement faute lourde', value: 'gross_fault_layoff' },
  { label: 'Licenciement autre motif', value: 'other_reason_layoff' },
  { label: 'Mutation', value: 'mutation' },
  { label: 'Rupture conventionnelle', value: 'contractual_termination' },
  { label: 'Fin de stage', value: 'internship_end' },
  { label: 'Fin de contrat CDD', value: 'cdd_end' },
  { label: 'Autres', value: OTHER },
];
export const CONTRACT_CREATION_MANDATORY_INFO = {
  'identity.lastname': 'nom',
  'identity.firstname': 'prénom',
  'identity.birthDate': 'date de naissance',
  'identity.birthCity': 'ville de naissance',
  'identity.birthState': 'département de naissance',
  'identity.nationality': 'nationalité',
  'identity.socialSecurityNumber': 'numéro de sécurité sociale',
  'contact.address.fullAddress': 'adresse',
  establishment: 'établissement',
};

// EVENTS
export const INTERVENTION = 'intervention';
export const ABSENCE = 'absence';
export const UNAVAILABILITY = 'unavailability';
export const INTERNAL_HOUR = 'internal_hour';
export const PAID_LEAVE = 'leave';
export const UNPAID_LEAVE = 'unpaid_leave';
export const MATERNITY_LEAVE = 'maternity_leave';
export const PATERNITY_LEAVE = 'paternity_leave';
export const PARENTAL_LEAVE = 'parental_leave';
export const WORK_ACCIDENT = 'work_accident';
export const TRANSPORT_ACCIDENT = 'transport_accident';
export const ILLNESS = 'illness';
export const UNJUSTIFIED = 'unjustified_absence';
export const CESSATION_OF_WORK_CHILD = 'cessation_of_work_child';
export const CESSATION_OF_WORK_RISK = 'cessation_of_work_risk';
export const ABSENCE_TYPES = [
  { label: 'Congé', value: PAID_LEAVE },
  { label: 'Congé sans solde', value: UNPAID_LEAVE },
  { label: 'Congé maternité', value: MATERNITY_LEAVE },
  { label: 'Congé paternité', value: PATERNITY_LEAVE },
  { label: 'Congé parental', value: PARENTAL_LEAVE },
  { label: 'Accident du travail', value: WORK_ACCIDENT },
  { label: 'Accident de trajet', value: TRANSPORT_ACCIDENT },
  { label: 'Maladie', value: ILLNESS },
  { label: 'Absence injustifiée', value: UNJUSTIFIED },
  { label: 'Arrêt de travail - garde d’enfant', value: CESSATION_OF_WORK_CHILD },
  { label: 'Arrêt de travail - salarié(e) à risque', value: CESSATION_OF_WORK_RISK },
  { label: 'Autre', value: OTHER },
];
export const EDITION = 'edition';
export const DELETION = 'deletion';
export const CANCELLATION = 'cancellation';
export const CREATION = 'creation';
export const DAILY = 'daily';
export const HALF_DAILY = 'half_daily';
export const ABSENCE_NATURES = [
  { label: 'Journalière', value: DAILY },
  { label: 'Demi-journalière', value: HALF_DAILY },
  { label: 'Horaire', value: HOURLY },
];
export const EVENT_TYPES = [
  { label: 'Intervention', value: INTERVENTION },
  { label: 'Interne', value: INTERNAL_HOUR },
  { label: 'Absence', value: ABSENCE },
  { label: 'Indispo', value: UNAVAILABILITY },
];

export const CANCEL_EVENT = 'cancel_event';
export const RESTORE_EVENT = 'restore_event';

// THIRD PARTY PAYERS
export const BILLING_INDIRECT = 'indirect';
export const BILLING_DIRECT = 'direct';
export const APA = 'APA';
export const PCH = 'PCH';
export const AM = 'AM';
export const TPP_TYPE_OPTIONS = [
  { label: 'APA', value: APA },
  { label: 'Aide ménagère', value: AM },
  { label: 'PCH', value: PCH },
];

// AVATAR
export const DEFAULT_AVATAR = 'https://storage.googleapis.com/compani-main/default_avatar.png';
export const UNKNOWN_AVATAR = 'https://storage.googleapis.com/compani-main/unknown_avatar.png';

// REPETITION FREQUENCY
export const NEVER = 'never';
export const EVERY_DAY = 'every_day';
export const EVERY_WEEK_DAY = 'every_week_day';
export const EVERY_WEEK = 'every_week';
export const EVERY_TWO_WEEKS = 'every_two_weeks';

export const REPETITION_FREQUENCIES = [
  { label: 'Jamais', value: NEVER },
  { label: 'Tous les jours', value: EVERY_DAY },
  { label: 'Tous les jours de la semaine (lundi au vendredi)', value: EVERY_WEEK_DAY },
];

// CANCELLATION OPTIONS
export const INVOICED_AND_PAID = 'invoiced_and_paid';
export const INVOICED_AND_NOT_PAID = 'invoiced_and_not_paid';
export const NOT_INVOICED_AND_NOT_PAID = 'not_invoiced_and_not_paid';
export const CANCELLATION_OPTIONS = [
  { label: 'Facturée au client & payée à l\'auxiliaire', value: INVOICED_AND_PAID },
  { label: 'Facturée & non payée', value: INVOICED_AND_NOT_PAID },
  { label: 'Non facturée & non payée', value: NOT_INVOICED_AND_NOT_PAID },
];

// CANCELLATION REASONS
export const CUSTOMER_INITIATIVE = 'customer_initiative';
export const AUXILIARY_INITIATIVE = 'auxiliary_initiative';
export const CANCELLATION_REASONS = [
  { label: 'Client', value: CUSTOMER_INITIATIVE },
  { label: 'Intervenant(e)', value: AUXILIARY_INITIATIVE },
];

// INTERFACE
export const VENDOR = 'vendor';
export const CLIENT = 'client';

// ROLES CLIENT
export const CLIENT_ADMIN = 'client_admin';
export const COACH = 'coach';
export const CUSTOMER = 'customer';
export const AUXILIARY = 'auxiliary';
export const HELPER = 'helper';
export const PLANNING_REFERENT = 'planning_referent';
export const AUXILIARY_WITHOUT_COMPANY = 'auxiliary_without_company';

// ROLES VENDOR
export const VENDOR_ADMIN = 'vendor_admin';
export const TRAINING_ORGANISATION_MANAGER = 'training_organisation_manager';
export const TRAINER = 'trainer';

// ROLES HOLDING
export const HOLDING_ADMIN = 'holding_admin';

export const AUXILIARY_ROLES = [AUXILIARY, PLANNING_REFERENT, AUXILIARY_WITHOUT_COMPANY];
export const COACH_ROLES = [CLIENT_ADMIN, COACH];
export const ROLE_TRANSLATION = {
  [HELPER]: 'Aidant(e)',
  [AUXILIARY]: 'Auxiliaire',
  [PLANNING_REFERENT]: 'Auxiliaire',
  [AUXILIARY_WITHOUT_COMPANY]: 'Auxiliaire',
  [CLIENT_ADMIN]: 'Administrateur(rice)',
  [VENDOR_ADMIN]: 'Administrateur(rice) Vendeur',
  [COACH]: 'Coach',
  [TRAINING_ORGANISATION_MANAGER]: 'Responsable Formation',
  [TRAINER]: 'Formateur(rice)',
};

// ROLE TRANSLATION
export const ROLES_TRANSLATION = {
  [CLIENT_ADMIN]: 'Administrateur(rice)',
  [COACH]: 'Coach',
};

// SUBSCRIPTIONS
export const ERP = 'erp';

// PLANNING
export const THREE_DAYS_VIEW = '3days';
export const WEEK_VIEW = 'week';
export const PLANNING = 'planning';
export const AGENDA = 'agenda';
export const PLANNING_VIEW_START_HOUR = 7;
export const PLANNING_VIEW_END_HOUR = 22;
export const PLANNING_PERCENTAGE_BY_MINUTES = 100 / ((PLANNING_VIEW_END_HOUR - PLANNING_VIEW_START_HOUR) * 60);
export const STAFFING_VIEW_START_HOUR = 8;
export const STAFFING_VIEW_END_HOUR = 20;
export const STAFFING_PERCENTAGE_BY_MINUTES = 100 / ((STAFFING_VIEW_END_HOUR - STAFFING_VIEW_START_HOUR) * 60);
export const SECTOR = 'sector';
export const PERSON = 'person';
export const MAX_WEEKLY_OCCUPATION_LEVEL = 48;
export const LOW = 'low';
export const HIGH = 'high';
export const EXTREME = 'extreme';

// EVENT HISTORY
export const EVENT_CREATION = 'event_creation';
export const EVENT_DELETION = 'event_deletion';
export const EVENT_UPDATE = 'event_update';
export const TIME_STAMP_CANCELLATION = 'time_stamp_cancellation';

// INDICATORS
export const PREV_MONTH_STATS = 'prev_month_stat';
export const MONTH_STATS = 'month_stat';

// TRANSORT
export const PUBLIC_TRANSPORT = 'public';
export const PRIVATE_TRANSPORT = 'private';
export const COMPANY_TRANSPORT = 'company_transport';
export const TRANSPORT_OPTIONS = [
  { label: 'Abonnement transports en commun', value: PUBLIC_TRANSPORT },
  { label: 'Voiture personnelle', value: PRIVATE_TRANSPORT },
  { label: 'Aucun', value: 'none' },
];
export const EVENT_TRANSPORT_OPTIONS = [
  { label: 'Pas de mode de transport spécifique', value: '' },
  { label: 'Transports en commun / À pied', value: PUBLIC_TRANSPORT },
  { label: 'Véhicule personnel', value: PRIVATE_TRANSPORT },
  { label: 'Véhicule d\'entreprise', value: COMPANY_TRANSPORT },
];

export const REQUIRED_LABEL = 'Champ requis';
export const INVALID_NUMBER = 'Nombre invalide';

// BILLING
export const TWO_WEEKS = 'two_weeks';
export const BILL = 'bill';
export const CREDIT_NOTE = 'creditNote';

// PAYMENTS
export const DIRECT_DEBIT = 'direct_debit';
export const BANK_TRANSFER = 'bank_transfer';
export const CHECK = 'check';
export const CESU = 'cesu';
export const CASH = 'cash';
export const CREDIT = 'credit';
export const CREDIT_OPTION = { label: 'Crédit', value: CREDIT };
export const PAYMENT_OPTIONS = [
  { label: 'Prélèvement', value: DIRECT_DEBIT },
  { label: 'Virement', value: BANK_TRANSFER },
  { label: 'Chèque', value: CHECK },
  { label: 'CESU', value: CESU },
  { label: 'Espèces', value: CASH },
];
export const REFUND = 'refund';
export const PAYMENT = 'payment';
export const PAYMENT_NATURE_OPTIONS = [
  { label: 'Paiement', value: PAYMENT },
  { label: 'Remboursement', value: REFUND },
];

// FUNDINGS
export const THIRD_PARTY_PAYER = 'thirdPartyPayer';

// PAY
export const PAY = 'pay';

// ORIGINS
export const COMPANI = 'compani';
export const THIRD_PARTY = 'third_party';
export const OGUST = 'ogust';

export const WEEKS_PER_MONTH = (52 / 12);

// PAY DOCUMENT NATURE
export const PAYSLIP = 'payslip';
export const CERTIFICATE = 'certificate';
export const PAY_DOCUMENT_NATURES = [
  { label: 'Bulletin de paie', value: PAYSLIP },
  { label: 'Attestation', value: CERTIFICATE },
  { label: 'Autre', value: OTHER },
];

// COMPANY
export const COMPANY = 'company';
export const ASSOCIATION = 'association';
export const COMPANY_TYPES = [
  { label: 'Association', value: ASSOCIATION },
  { label: 'Entreprise', value: COMPANY },
];

// SMS
export const CONVOCATION = 'convocation';
export const REMINDER = 'reminder';
export const HR_SMS = 'RH';
export const COURSE_SMS = 'Formation';

// COURSE
export const INTRA = 'intra';
export const INTER_B2B = 'inter_b2b';
export const INTRA_HOLDING = 'intra_holding';
export const COURSE_TYPES = [
  { label: 'Intra', value: INTRA },
  { label: 'Inter B2B', value: INTER_B2B },
  { label: 'Intra société mère', value: INTRA_HOLDING },
];
export const BLENDED = 'blended';
export const STRICTLY_E_LEARNING = 'strictly_e_learning';
export const FORTHCOMING = 'forthcoming';
export const IN_PROGRESS = 'inProgress';
export const COMPLETED = 'completed';
export const OPERATIONS = 'operations';
export const PEDAGOGY = 'pedagogy';
export const ARCHIVED_COURSES = 'archived_courses';
export const UNARCHIVED_COURSES = 'unarchived_courses';

// SUBPROGRAM
export const PUBLISHED = 'published';

// STEP
export const E_LEARNING = 'e_learning';
export const ON_SITE = 'on_site';
export const REMOTE = 'remote';
export const STEP_TYPES = [
  { label: 'eLearning', value: E_LEARNING },
  { label: 'présentiel', value: ON_SITE },
  { label: 'distanciel', value: REMOTE },
];
export const REUSE_STEP = 'reuse_step';
export const CREATE_STEP = 'create_step';
export const STEP_ATTACHEMENT_OPTIONS = [
  { label: 'Créer', value: CREATE_STEP },
  { label: 'Réutiliser', value: REUSE_STEP },
];

// ACTIVITY
export const LESSON = 'lesson';
export const QUIZ = 'quiz';
export const SHARING_EXPERIENCE = 'sharing_experience';
export const VIDEO = 'video';
export const ACTIVITY_TYPES = [
  { label: 'Cours', value: LESSON },
  { label: 'Quiz', value: QUIZ },
  { label: 'Témoignage', value: SHARING_EXPERIENCE },
  { label: 'Vidéo', value: VIDEO },
];

// CARD CATEGORIES
export const QUESTIONNAIRE = 'questionnaire';

// E-LEARNING CARDS
export const TRANSITION = 'transition';
export const TITLE_TEXT_MEDIA = 'title_text_media';
export const TITLE_TEXT = 'title_text';
export const TEXT_MEDIA = 'text_media';
export const FLASHCARD = 'flashcard';
export const FILL_THE_GAPS = 'fill_the_gaps';
export const MULTIPLE_CHOICE_QUESTION = 'multiple_choice_question';
export const SINGLE_CHOICE_QUESTION = 'single_choice_question';
export const ORDER_THE_SEQUENCE = 'order_the_sequence';
export const OPEN_QUESTION = 'open_question';
export const SURVEY = 'survey';
export const QUESTION_ANSWER = 'question_answer';
export const CARD_TEMPLATES = [
  { label: 'Transition', value: TRANSITION, type: LESSON },
  { label: 'Titre Texte Média', value: TITLE_TEXT_MEDIA, type: LESSON },
  { label: 'Titre Texte', value: TITLE_TEXT, type: LESSON },
  { label: 'Texte Média', value: TEXT_MEDIA, type: LESSON },
  { label: 'Flashcard', value: FLASHCARD, type: LESSON },
  { label: 'Texte à trou', value: FILL_THE_GAPS, type: QUIZ },
  { label: 'QCM', value: MULTIPLE_CHOICE_QUESTION, type: QUIZ },
  { label: 'QCU', value: SINGLE_CHOICE_QUESTION, type: QUIZ },
  { label: 'Mettre dans l\'ordre', value: ORDER_THE_SEQUENCE, type: QUIZ },
  { label: 'Question ouverte', value: OPEN_QUESTION, type: QUESTIONNAIRE },
  { label: 'Sondage', value: SURVEY, type: QUESTIONNAIRE },
  { label: 'Question\t&\tRéponse', value: QUESTION_ANSWER, type: QUESTIONNAIRE },
];

export const SINGLE_CHOICE_QUESTION_MAX_FALSY_ANSWERS_COUNT = 3;
export const SINGLE_CHOICE_QUESTION_MIN_FALSY_ANSWERS_COUNT = 1;
export const MULTIPLE_CHOICE_QUESTION_MAX_ANSWERS_COUNT = 4;
export const MULTIPLE_CHOICE_QUESTION_MIN_ANSWERS_COUNT = 2;
export const FILL_THE_GAPS_MIN_ANSWERS_COUNT = 2;
export const FILL_THE_GAPS_MAX_ANSWERS_COUNT = 6;
export const ORDER_THE_SEQUENCE_MIN_ANSWERS_COUNT = 2;
export const ORDER_THE_SEQUENCE_MAX_ANSWERS_COUNT = 3;
export const SURVEY_LABEL_MAX_LENGTH = 25;
export const QUESTION_MAX_LENGTH = 170;
export const QC_ANSWER_MAX_LENGTH = 70;
export const GAP_ANSWER_MAX_LENGTH = 15;
export const QUESTION_ANSWER_MIN_ANSWERS_COUNT = 2;
export const QUESTION_ANSWER_MAX_ANSWERS_COUNT = 4;
export const FLASHCARD_TEXT_MAX_LENGTH = 450;

// PUBLISHED_DOT
export const PUBLISHED_DOT_ACTIVE = 'active';
export const PUBLISHED_DOT_WARNING = 'warning';

// COURSE HISTORY
export const SLOT_CREATION = 'slot_creation';
export const SLOT_DELETION = 'slot_deletion';
export const SLOT_EDITION = 'slot_edition';
export const TRAINEE_ADDITION = 'trainee_addition';
export const TRAINEE_DELETION = 'trainee_deletion';
export const ESTIMATED_START_DATE_EDITION = 'estimated_start_date_edition';
export const COMPANY_ADDITION = 'company_addition';
export const COMPANY_DELETION = 'company_deletion';

// MEDIA UPLOAD
export const UPLOAD_IMAGE = 'image';
export const UPLOAD_VIDEO = 'video';
export const UPLOAD_AUDIO = 'audio';
export const UPLOAD_EXTENSION_OPTIONS = [
  { label: 'Image', value: UPLOAD_IMAGE },
  { label: 'Video', value: UPLOAD_VIDEO },
  { label: 'Audio', value: UPLOAD_AUDIO },
];

// ACCESS RULES
export const FREE_ACCESS = 'free';
export const RESTRICTED_ACCESS = 'restricted';
export const ACCESS_OPTIONS = [
  { label: 'Libre accès', value: FREE_ACCESS },
  { label: 'Choisir une structure', value: RESTRICTED_ACCESS },
];

// ORIGIN
export const WEBAPP = 'webapp';

// FORMAT
export const PDF = 'pdf';
export const ALL_PDF = 'all_pdf';
export const ALL_WORD = 'all_word';

// TYPE
export const CUSTOM = 'custom';
export const OFFICIAL = 'official';

// Email
export const TRAINEE = 'trainee';

// QUESTIONNAIRE TYPES
export const EXPECTATIONS = 'expectations';
export const END_OF_COURSE = 'end_of_course';
export const DRAFT = 'draft';
export const QUESTIONNAIRE_TYPES = { [EXPECTATIONS]: 'Recueil des attentes', [END_OF_COURSE]: 'Fin de formation' };

// EXPORTS
export const SERVICE = 'service';
export const SUBSCRIPTION = 'subscription';
export const FUNDING = 'funding';
export const RUP = 'rup';
export const REFERENT = 'referent';
export const WORKING_EVENT = 'working_event';
export const TRANSPORT = 'transport';
export const EXPORT_TYPES = [
  { label: 'Services', value: SERVICE },
  { label: 'Souscriptions', value: SUBSCRIPTION },
  { label: 'Financements', value: FUNDING },
  { label: 'Auxiliaires', value: AUXILIARY },
  { label: 'Bénéficiaires', value: CUSTOMER },
  { label: 'Aidants', value: HELPER },
  { label: 'Equipes', value: SECTOR },
  { label: 'Registre unique du personnel', value: RUP },
  { label: 'Référents bénéficiaire', value: REFERENT },
];
export const EXPORT_HISTORY_TYPES = [
  { label: 'Interventions et heures internes', value: WORKING_EVENT },
  { label: 'Factures et avoirs', value: BILL },
  { label: 'Paiements et remboursements', value: PAYMENT },
  { label: 'Absences', value: ABSENCE },
  { label: 'Paies et soldes tout compte', value: PAY },
  { label: 'Contrats', value: CONTRACT },
  { label: 'Transports', value: TRANSPORT },
];
export const COURSE = 'course';
export const COURSE_SLOT = 'course_slot';
export const COURSE_BILL = 'course_bill';
export const COURSE_PAYMENT = 'course_payment';
export const VENDOR_EXPORT_HISTORY_TYPES = [
  { label: 'Formations', value: COURSE },
  { label: 'Créneaux', value: COURSE_SLOT },
  { label: 'Questionnaires de satisfaction', value: END_OF_COURSE },
  { label: 'Factures et avoirs', value: COURSE_BILL },
  { label: 'Paiements et remboursements', value: COURSE_PAYMENT },
];

// PARTNER
export const JOB_OPTIONS = [
  { label: 'Assistante sociale', value: 'social_worker' },
  { label: 'Évaluateur médico-social', value: 'medico_social_assessor' },
  { label: 'Docteur', value: 'doctor' },
  { label: 'Gériatre', value: 'geriatrician' },
  { label: 'Coordinateur', value: 'coordinator' },
  { label: 'Directeur', value: 'director' },
  { label: 'Gestionnaire de cas', value: 'case_manager' },
  { label: 'Infirmier', value: 'nurse' },
  { label: 'Psychologue', value: 'psychologist' },
];

// CUSTOMER STATUS
export const ACTIVATED = 'activated';
export const STOPPED = 'stopped';
export const ARCHIVED = 'archived';
export const STATUS_TYPES = { [ACTIVATED]: 'Actif', [STOPPED]: 'Arrêté', [ARCHIVED]: 'Archivé' };

// CUSTOMER STOP REASONS
export const SUPPORT_STOPPING_REASONS_OPTIONS = [
  { label: 'Qualité', value: 'quality' },
  { label: 'Hospitalisation', value: 'hospitalization' },
  { label: 'Décès', value: 'death' },
  { label: 'Départ en EPHAD', value: 'ephad_departure' },
  { label: 'Amélioration de l\'état', value: 'condition_improvement' },
  { label: 'Autre', value: 'other' },
];

// TIMESTAMPING
export const MANUAL_TIME_STAMPING = 'manual_time_stamping';
export const QR_CODE_TIME_STAMPING = 'qr_code_time_stamping';
export const TIME_STAMPING_ACTIONS = [MANUAL_TIME_STAMPING, QR_CODE_TIME_STAMPING];
export const QRCODE_MISSING = 'qrcode_missing';
export const QRCODE_ERROR = 'qrcode_error';
export const CAMERA_ERROR = 'camera_error';
export const MANUAL_TIME_STAMPING_REASONS = {
  [QRCODE_MISSING]: 'Je n\'ai pas accès au code barre',
  [QRCODE_ERROR]: 'Le code barre ne fonctionne pas',
  [CAMERA_ERROR]: 'Mon appareil photo ne fonctionne pas',
};

// NOTE
export const NOTE_CREATION = 'note_creation';
export const NOTE_UPDATE = 'note_update';

// BILLING ITEMS
export const MANUAL = 'manual';
export const AUTOMATIC = 'automatic';
export const PER_INTERVENTION = 'per_intervention';
export const BILLING_ITEMS_TYPE_OPTIONS = [
  { label: 'Manuel', value: MANUAL },
  { label: 'Par intervention', value: PER_INTERVENTION },
];

// CREDIT_NOTES
export const EVENTS = 'events';
export const BILLING_ITEMS = 'billing_items';
export const CREDIT_NOTE_TYPE_OPTIONS = [
  { label: 'Souscription', value: SUBSCRIPTION },
  { label: 'Intervention', value: EVENTS },
  { label: 'Article manuel', value: BILLING_ITEMS },
];

// COURSE_BILLS
export const LIST = 'list';
export const BALANCE = 'balance';
export const FUNDING_ORGANISATION = 'funding_organisation';
export const GROUP = 'group';
export const COUNT_UNIT = { [GROUP]: 'groupe', [TRAINEE]: 'stagiaire' };

// KANBAN COURSE FILTERS
export const WITHOUT_TRAINER = 'without_trainer';
export const WITHOUT_SALES_REPRESENTATIVE = 'without_sales_representative';

// END_TO_END TESTS
export const BILLING = 'billing';
export const AUTHENTICATION = 'authentication';

// DAYS
export const DAYS = {
  0: 'Lundi',
  1: 'Mardi',
  2: 'Mercredi',
  3: 'Jeudi',
  4: 'Vendredi',
  5: 'Samedi',
  6: 'Dimanche',
};

// DATE AND DURATION UNITS
export const YEAR = 'year';
export const QUARTER = 'quarter';
export const MONTH = 'month';
export const WEEK = 'week';
export const DAY = 'day';
export const HOUR = 'hour';
export const MINUTE = 'minute';
export const SECOND = 'second';
export const MILLISECOND = 'millisecond';

// COMPANIDURATION
export const PT0S = 'PT0S';

// COMPANIDURATION FORMATS
export const LONG_DURATION_H_MM = 'h\'h\' mm\'min\'';
export const SHORT_DURATION_H_MM = 'h\'h\'mm';

// COMPANIDATE FORMATS
export const DD_MM_YYYY = 'dd/LL/yyyy';
export const DD_MM = 'dd/LL';
export const MM_YYYY = 'LL-yyyy';
export const HHhMM = 'HH\'h\'mm';
export const DAY_MONTH_YEAR = 'DDD';
export const HH_MM = 'T';
export const MONTH_SHORT = 'LLL';
export const MONTH_SHORT_YYYY = 'LLL yyyy';
export const DAY_OF_MONTH = 'd';
export const DAY_OF_WEEK_SHORT = 'ccc';

// LEARNERS
export const DIRECTORY = 'directory';

// BUTTONS TYPES
export const FLOATING = 'floating';
export const MODAL = 'modal';

// QUESTIONNAIRE CARD NAVIGATION
export const DECREMENT = 'decrement';
export const INCREMENT = 'increment';
export const GO_TO_CARD = 'go_to_card';
export const START_CARD_INDEX = -1;

// OPTION GROUP TYPE
export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';

// TRAINER MISSION CREATION METHOD TYPES
export const UPLOAD = 'upload';
export const GENERATION = 'generation';
export const CREATION_METHOD_OPTIONS = [
  { label: 'Téléverser', value: UPLOAD },
  { label: 'Générer', value: GENERATION },
];
