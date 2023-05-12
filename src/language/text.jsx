export const text = {
  varsel: {
    nb: "Varsel",
    nn: "Varsel",
    en: "Notification",
  },
  varselIngressOppgaveEntall: {
    nb: (antallOppgaver) => `${antallOppgaver} oppgave`,
    nn: (antallOppgaver) => `${antallOppgaver} oppgåve`,
    en: (antallOppgaver) => `${antallOppgaver} task`,
  },
  varselIngressOppgaveFlertall: {
    nb: (antallOppgaver) => `${antallOppgaver} oppgaver`,
    nn: (antallOppgaver) => `${antallOppgaver} oppgåver`,
    en: (antallOppgaver) => `${antallOppgaver} tasks`,
  },
  varselIngressBeskjedEntall: {
    nb: (antallBeskjeder) => `${antallBeskjeder} beskjed`,
    nn: (antallBeskjeder) => `${antallBeskjeder} beskjed`,
    en: (antallBeskjeder) => `${antallBeskjeder} message`,
  },
  varselIngressBeskjedFlertall: {
    nb: (antallBeskjeder) => `${antallBeskjeder} beskjeder`,
    nn: (antallBeskjeder) => `${antallBeskjeder} beskjeder`,
    en: (antallBeskjeder) => `${antallBeskjeder} messages`,
  },
  varselOppgaverOgBeskjeder: {
    nb: " og ",
    nn: " og ",
    en: " and ",
  },
  varselIngressIngenVarsler: {
    nb: "Ingen varsler",
    nn: "Ingen varsel",
    en: "No notifications",
  },
  utkastTittel: {
    nb: "Utkast",
    nn: "Utkast",
    en: "Drafts",
  },
  utkastIngressEntall: {
    nb: "En påbegynt søknad",
    nn: "Ein søknad du har starta på",
    en: "One started application",
  },
  utkastIngressFlertall: {
    nb: (antall) => `${antall} påbegynte søknader`,
    nn: (antall) => `${antall} søknadar du har starta på`,
    en: (antall) => `${antall} started applications`,
  },
  sidetittelVelkomsthilsen: {
    nb: "Hei, ",
    nn: "Hei, ",
    en: "Hi, ",
  },
  sidetittelVelkomsthilsenMorgen: {
    nb: "God morgen, ",
    nn: "God morgon, ",
    en: "Good morning, ",
  },
  sidetittelVelkomsthilsenKveld: {
    nb: "God kveld, ",
    nn: "God kveld, ",
    en: "Good evening, ",
  },
  loaderTekst: {
    nb: "Laster...",
    nn: "Lastar...",
    en: "Loading...",
  },
  feilmelding: {
    nb: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
    en: "We're having technical difficulties. Some information may not be available, please try again later.",
    nn: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
  },
  utbetalingerLenketekst: {
    nb: "Dine utbetalinger",
    nn: "Utbetalingane dine",
    en: "My payments",
  },
  sisteSakerTittel: {
    nb: "Dine siste saker",
    nn: "Dei siste sakane dine",
    en: "My recent cases",
  },
  sisteSakerLenketekst: {
    nb: "Se alle dine saker",
    nn: "Sjå alle sakane dine",
    en: "All my cases",
  },
  sisteSakerLenkedetail: {
    nb: "Sist oppdatert: ",
    nn: "Sist oppdatert: ",
    en: "Last updated: ",
  },
  seAlle: {
    nb: "Se alle",
    nn: "Sjå alle",
    en: "See all",
  },
  kommunikasjonsFlisTittel: {
    nb: "Kommunikasjon med NAV",
    nn: "Kommunikasjon med NAV",
    en: "Communication with NAV",
  },
  kommunikasjonsFlisLenketekstInnboks: {
    nb: "Innboks",
    nn: "Innboks",
    en: "Inbox",
  },
  kommunikasjonsFlisIngressInnboks: {
    nb: "Informasjon fra NAV og svar på henvendelser og referater fra samtaler du har på telefon, chat og “Skriv til oss”.",
    nn: "Informasjon frå NAV og svar på førespurnadar og referat frå samtalar du har på telefon, chat og “Skriv til oss”.",
    en: "Information from NAV and replies to inquiries, and summaries of conversations via phone calls, chats and “Write to us”.",
  },
  kommunikasjonsFlisLenketekstDialog: {
    nb: "Dialog med den lokale veilederen din",
    nn: "Dialog med den lokale rettleiaren din",
    en: "Communication with your local consultant",
  },
  kommunikasjonsFlisIngressDialog: {
    nb: "For arbeidssøkere og de som mottar AAP. Les meldinger, referater og send melding til veilederen din.",
    nn: "For arbeidssøkarar og de som mottek AAP. Les meldingar, referat og send melding til rettleiaren din.",
    en: "For job seekers and those on AAP. Read messages and summaries or send a message to your consultant.",
  },
  kommunikasjonsFlisLenketekstBrevOgVedtak: {
    nb: "Brev og vedtak",
    nn: "Brev og vedtak",
    en: "Letters and decisions",
  },
  kommunikasjonsFlisIngressBrevOgVedtak: {
    nb: "For deg som ikke har Digipost eller e-Boks.",
    nn: "For deg som ikkje har Digipost eller e-Boks.",
    en: "If you don’t have Digipost or e-Boks.",
  },
  generelleFliserSykefravaer: {
    nb: "Ditt sykefravær",
    nn: "Ditt sjukefråvær",
    en: "My absences due to sickness",
  },
  generelleFliserMistetJobb: {
    nb: "Mistet jobben?",
    nn: "Mista jobben?",
    en: "Lost your job?",
  },
  generelleFliserSkjemaer: {
    nb: "Skjemaer",
    nn: "Skjema",
    en: "Forms",
  },
  generelleFliserPensjon: {
    nb: "Din pensjon",
    nn: "Din pensjon",
    en: "My pension",
  },
  ledigeStillinger: {
    nb: "Ledige stillinger",
    nn: "Ledige stillinger",
    en: "Job listings",
  },
  uforetrygd: {
    nb: "Uføretrygd",
    nn: "Uføretrygd",
    en: "Disability benefit",
  },
  dineForeldrepenger: {
    nb: "Dine foreldrepenger",
    nn: "Dine foreldrepenger",
    en: "My parental benefit",
  },
  aktivitetsplan: {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Activity plan",
  },
  meldekort: {
    nb: "Meldekort",
    nn: "Meldekort",
    en: "Employment status form",
  },
  personopplysninger: {
    nb: "Personopplysninger",
    nn: "Personopplysninger",
    en: "Personal data",
  },
  skjemaer: {
    nb: "Skjemaer",
    nn: "Skjema",
    en: "Forms",
  },
  dinPensjon: {
    nb: "Din pensjon",
    nn: "Din pensjon",
    en: "My pension",
  },
  dineStillingssok: {
    nb: "Dine stillingssøk",
    nn: "Dine stillingssøk",
    en: "My job searches",
  },
  veilederArbeidssoker: {
    nb: "Veileder for arbeidssøker",
    nn: "Rettleiar for arbeidssøkar",
    en: "Guide for job seekers",
  },
  registrerDegSomArbeidssoker: {
    nb: "Registrer deg som arbeidssøker",
    nn: "Registrer deg som arbeidssøkar",
    en: "Register as a job seeker",
  },
  sosialhjelp: {
    nb: "Økonomisk sosialhjelp",
    nn: "Økonomisk sosialhjelp",
    en: "Financial assistance",
  },
  dineFullmakter: {
    nb: "Dine fullmakter",
    nn: "Dine fullmakter",
    en: "My authorizations",
  },
  dinePleiepenger: {
    nb: "Dine pleiepenger",
    nn: "Dine pleiepengar",
    en: "My attendance allowance",
  },
  dittSykefravaer: {
    nb: "Ditt sykefravær",
    nn: "Ditt sjukefravær",
    en: "My absences due to sickness",
  },
  hjelpemidler: {
    nb: "Hjelpemidler",
    nn: "Hjelpemiddel",
    en: "Assistive technology",
  },
  arbeidsavklaringspenger: {
    nb: "Arbeidsavklaringspenger",
    nn: "Arbeidsavklaringspengar",
    en: "Work assessment allowance",
  },
  uxTweakTittel: {
    nb: "Vil du bli med på en enkel test av Min side?",
    nn: "Vil du bli med på en enkel test av Min side?",
    en: "Vil du bli med på en enkel test av Min side?",
  },
  uxTweakIngress1: {
    nb: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
    nn: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
    en: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
  },
  uxTweakIngress2: {
    nb: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
    nn: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
    en: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
  },
  uxTweakLenketekst: {
    nb: "Ja, jeg vil teste",
    nn: "Ja, jeg vil teste",
    en: "Ja, jeg vil teste",
  },
  aktivitetsplanId: {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Aktivitetsplan",
  },
  alleInnloggedeTjenesterTittel: {
    nb: "Alle innloggede tjenester",
    nn: "Alle innlogga tenester",
    en: "Signed in services",
  },
  jobbOgOppfolgingTittel: {
    nb: "JOBB OG OPPFØLGING",
    nn: "JOBB OG OPPFØLGING",
    en: "JOB AND WORK RELATED SERVICES",
  },
  pengeStøtteOgHjelpemidlerTittel: {
    nb: "PENGESTØTTE OG HJELPEMIDLER",
    nn: "PENGESTØTTER OG HJELPEMIDDEL",
    en: "BENEFITS AND ASSISTIVE TECHNOLOGY",
  },
  personopplysningTittel: {
    nb: "PERSONOPPLYSNING",
    nn: "PERSONOPPLYSNINGAR",
    en: "PERSONAL DATA",
  },
  annetTittel: {
    nb: "ANNET",
    nn: "ANNA",
    en: "OTHER",
  },
};
