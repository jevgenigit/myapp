import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    infoText: 
      `What is a Virtual Power Plant (VPP)?\n\n` +
      `A Virtual Power Plant (VPP) is a network of decentralized, small-scale power sources such as solar panels, wind turbines, or energy storage systems. ` +
      `These units are connected and managed through software to act as a single, flexible power plant.\n\n` +
      `How Does a VPP Work?\n\n` +
      `VPPs collect and manage energy from different sources, like homes with solar panels or batteries. ` +
      `The system monitors the energy production and consumption in real-time. ` +
      `It can adjust energy flow to match supply with demand, making the grid more efficient.\n\n` +
      `Controlling the VPP\n\n` +
      `The VPP software controls how energy is stored and distributed. ` +
      `It can increase or decrease the power supplied based on the needs of the grid. ` +
      `The goal is to balance energy use efficiently while reducing costs and maintaining grid stability.`,
    welcomeText: 'Welcome to the Virtual Power Plant simulator!',
    landingpageText: 
      `As the administrator of the Virtual Power Plant, you must keep the grid frequency between 49 and 51 Hz to avoid blackout. ` +
      `Use the controls to adjust power production and demand. ` +
      `If the frequency drops, increase production or reduce demand. ` +
      `If it rises, decrease production or increase demand.`,
    vppTitle: 'VPP',  
    startButtonText: 'Start',
    
    information: 'Information',
    editGame: 'Edit game',
    restartGame: 'Restart game',
    current: 'Current',
    mw: 'MW',

    'Wind park': 'Wind park',
    'Solar park': 'Solar park',
    'Households': 'Households',
    'Fossil fuel power station': 'Fossil fuel power station',
    'Industrial factory': 'Industrial factory',
    'Production:': 'production',
    'Consumption:': 'consumption',
    'Producers:': 'Producers',
    'Consumers:': 'Consumers',
    'Total': 'Total',
    MakeProductionBigger: 'Increase production',
    MakeProductionSmaller: 'Reduce production',
    MakeConsumptionBigger: 'Increase consumption',
    MakeConsumptionSmaller: 'Reduce consumption',
  },
  et: {
    infoText:
      `Mis on virtuaalne elektrijaam (VPP)?\n\n` +
      `Virtuaalne elektrijaam (VPP) on detsentraliseeritud väikese mahuga energiatootmisallikate võrgustik, nagu päikesepaneelid, tuulegeneraatorid või energiasalvestussüsteemid. ` +
      `Need üksused on ühendatud ja hallatud tarkvara abil, et tegutseda ühe paindliku elektrijaamana.\n\n` +
      `Kuidas VPP töötab?\n\n` +
      `VPP-d koguvad ja haldavad energiat erinevatest allikatest, nagu kodud, kus on päikesepaneelid või akud. ` +
      `Süsteem jälgib energiatootmist ja tarbimist reaalajas. ` +
      `See suudab reguleerida energia voogu, et tasakaalustada pakkumist ja nõudlust, muutes võrgu tõhusamaks.\n\n` +
      `VPP juhtimine\n\n` +
      `VPP tarkvara juhib, kuidas energiat salvestatakse ja jaotatakse. ` +
      `See võib suurendada või vähendada võimsust võrgu vajaduste põhjal. ` +
      `Eesmärk on tasakaalustada energia kasutamine tõhusalt, vähendades kulusid ja tagades võrgu stabiilsuse.`,
    welcomeText: 'Tere tulemast virtuaalse elektrijaama simulaatorisse!',
    landingpageText: 
      `Virtuaalse elektrijaama (VPP) administraatorina peate hoidma võrgu sageduse vahemikus 49 kuni 51 Hz, et vältida elektrikatkestust. ` +
      `Kasutage juhtnuppe, et reguleerida energiatootmist ja -nõudlust. ` +
      `Kui sagedus langeb, suurendage tootmist või vähendage nõudlust. ` +
      `Kui see tõuseb, vähendage tootmist või suurendage nõudlust.`,
    vppTitle: 'VPP',
    startButtonText: 'Alusta',
    
    information: 'Informatsioon',
    editGame: 'Mängu muutmine',
    restartGame: 'Alusta uuesti',
    current: 'Hetkel',
    mw: 'MW',

    'Wind park': 'Tuulepark',
    'Solar park': 'Päikesepark',
    'Households': 'Majapidamised',
    'Fossil fuel power station': 'Fossiilkütuse jaam',
    'Industrial factory': 'Tööstusvabrik',
    'Production:': 'tootmine',
    'Consumption:': 'tarbimine',
    'Producers:': 'Tootjad',
    'Consumers:': 'Tarbjad',
    'Total': 'Kokku',
    MakeProductionBigger: 'Suurendage tootmist',
    MakeProductionSmaller: 'Vähendage tootmist',
    MakeConsumptionBigger: 'Suurendage tarbimist',
    MakeConsumptionSmaller: 'Vähendage tarbimist',
  },
  ru: {
    infoText:
      `Что такое виртуальная электростанция (VPP)?\n\n` +
      `Виртуальная электростанция (VPP) — это сеть децентрализованных, маломощных источников энергии, таких как солнечные панели, ветряные турбины или системы накопления энергии. ` +
      `Эти устройства соединены и управляются с помощью программного обеспечения, чтобы работать как одна гибкая электростанция.\n\n` +
      `Как работает VPP?\n\n` +
      `VPP собирает и управляет энергией из различных источников, таких как дома с солнечными панелями или аккумуляторами. ` +
      `Система отслеживает производство и потребление энергии в реальном времени. ` +
      `Она может регулировать поток энергии, чтобы сбалансировать предложение и спрос, делая сеть более эффективной.\n\n` +
      `Управление VPP\n\n` +
      `Программное обеспечение VPP управляет тем, как энергия сохраняется и распределяется. ` +
      `Она может увеличивать или уменьшать подачу энергии в зависимости от потребностей сети. ` +
      `Цель состоит в том, чтобы эффективно сбалансировать потребление энергии, снижая затраты и поддерживая стабильность сети.`,
    welcomeText: 'Добро пожаловать в симулятор виртуальной электростанции!',
    landingpageText: 
      `В качестве администратора виртуальной электростанции (VPP) вы должны поддерживать частоту сети в пределах от 49 до 51 Гц, чтобы избежать отключений. ` +
      `Используйте элементы управления для регулирования производства энергии и потребности. ` +
      `Если частота снижается, увеличьте производство или уменьшите потребление. ` +
      `Если она повышается, уменьшите производство или увеличьте потребление.`,
    vppTitle: 'VPP',
    startButtonText: 'Старт',
    
    information: 'Информация',
    editGame: 'Редактировать игру',
    restartGame: 'Перезапустить игру',
    current: 'Текущий',
    mw: 'МВт',
    'Wind park': 'Ветропарк',
    'Solar park': 'Солнечная электростанция',
    'Households': 'Домохозяйства',
    'Fossil fuel power station': 'ТЭС',
    'Industrial factory': 'Фабрика',
    'Production:': 'производство',
    'Consumption:': 'потребление',
    'Producers:': 'Производители:',
    'Consumers:': 'Потребители:',
    'total': 'Суммарное',
    MakeProductionBigger: 'Увеличить производство',
    MakeProductionSmaller: 'Уменьшить производство',
    MakeConsumptionBigger: 'Увеличить потребление',
    MakeConsumptionSmaller: 'Уменьшить потребление',
  }
};

const i18n = createI18n({
  locale: 'en', 
  messages,
});

export default i18n;
