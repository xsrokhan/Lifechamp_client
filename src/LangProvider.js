import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Context'

export const PlaceholderProvider = () => {
    const { lang } = useContext(Context)

    const langObj = {
        "LF_en": "New task...",
        "LF_ru": "Новое задание...",
        "LF_ar": "...مهمة جديدة",
        "LF_az": "Yeni tapşırıq...",
        "LF_sp": "Новое задание...",
        "LF_fr": "Nouvelle tâche...",
        "LF_fa": "...کار جدید",
        "LF_tr": "Yeni görev...",
        "LF_it": "Nuovo compito...",
        "LF_ch": "新任务...",
    }
    
    return langObj[lang]
}

export const StatisticsLabelProvider = (location) => {
    const { lang } = useContext(Context)

    const langObj = {
        "LF_en": {
            "complete": "Tasks performed",
            "incomplete": "Tasks missed",
            "no-tasks": "No tasks for this period",
            "no-medals": "No medals earned during this period"
        },
        "LF_ru": {
            "complete": "Выполненные задания",
            "incomplete": "Невыполненные задания",
            "no-tasks": "Нет заданий за этот период",
            "no-medals": "Нет медалей за этот период"
        },
        "LF_ar": {
            "complete": "مهام منجزة",
            "incomplete": "مهام غير منجزة",
            "no-tasks": "لا توجد مهام لهذه الفترة",
            "no-medals": "No medals for this period"
        },
        "LF_az": {
            "complete": "Tamamlanmış tapşırıqlar",
            "incomplete": "Tamamlanmamış tapşırıqlar",
            "no-tasks": "Bu müddət ərzində tapşırıq olmayıb",
            "no-medals": "Bu müddət ərzində medal qazanılmayıb"
        },
        "LF_sp": {
            "complete": "Tareas realizadas",
            "incomplete": "Tareas no realizadas",
            "no-tasks": "No hay tareas para este período",
            "no-medals": "No hay medallas para este período"
        },
        "LF_fr": {
            "complete": "Tâches effectuées",
            "incomplete": "Tâches non effectuées",
            "no-tasks": "Pas de tâches pour cette période",
            "no-medals": "Pas de médailles gagnées pour cette période"
        },
        "LF_fa": {
            "complete": "انجام شده",
            "incomplete": "انجام نشده",
            "no-tasks": "No tasks for this period",
            "no-medals": "در این دوره هیچ مدالی کسب نشد"
        },
        "LF_tr": {
            "complete": "Tamamlanmış görevler",
            "incomplete": "Tamamlanmamış görevler",
            "no-tasks": "Bu dönem için görev yok",
            "no-medals": "Bu dönem için madalya kazanılmadı"
        },
        "LF_it": {
            "complete": "Compiti svolti",
            "incomplete": "Compiti non svolti",
            "no-tasks": "Non ci sono compiti per questo periodo",
            "no-medals": "Nessuna medaglia vinta per questo periodo"
        },
        "LF_ch": {
            "complete": "完成的任务",
            "incomplete": "未完成的任务",
            "no-tasks": "此期间没有任务",
            "no-medals": "此期间没有奖牌"
        },
    }

    return langObj[lang][location]
}

export const ActivityLabelProvider = () => {
    const { lang } = useContext(Context)

    const langObj = {
        "LF_en": "Today",
        "LF_ru": "Сегодня",
        "LF_ar": "اليوم",
        "LF_az": "Bu gün",
        "LF_sp": "Hoy",
        "LF_fr": "Aujourd'hui",
        "LF_fa": "امروز",
        "LF_tr": "Bugün",
        "LF_it": "Oggi",
        "LF_ch": "今天",
    }
    
    return langObj[lang]
}

export const FAQProvider = (location) => {
    const { lang } = useContext(Context)

    const langObj = {
        "LF_en": {
            "life-champ-q": "What is LifeChamp?",
            "life-champ-a": "LifeChamp is an app that allows you to set daily tasks of varying significance and visualize your progress over a period of time based on the amount of accumulated medals and graphs that reflect your activity and commitment.",
            "keep-track-q": "How do I keep track of my productivity?",
            "keep-track-a": "You can do so by viewing your activity and statistics data for different periods of time, as well as by navigating to the highlights section where you can view completed tasks for which silver and gold medals were received.",
            "medals-q": "What is the purpose of medals?",
            "medals-a": "Medals are a form of reward that the user selects for completing a task. Gold medals are meant for very important, sometimes even life-changing tasks, silver medals are meant for tasks of medium importance, while bronze medals are an appropriate reward for easier, less important tasks.",
            "task-q": "What if a task isn't completed on time?",
            "task-a": "Overdue tasks will have a red due date and will affect your completion rate. However, you can still complete these tasks and receive rewards for them."
        },
        "LF_ru": {
            "life-champ-q": "Что такое LifeChamp?",
            "life-champ-a": "LifeChamp — это приложение, которое позволяет вам ставить ежедневные задачи различной значимости и визуализировать свой прогресс за определенный период времени на основе количества накопленных медалей и графиков, отражающих вашу активность и усердие.",
            "keep-track-q": "Как отслеживать свою продуктивность?",
            "keep-track-a": "Вы можете делать это, просматривая свою активность и данные статистики за разные периоды времени, а также перейдя в раздел достижений, где можно просмотреть выполненные задания, за которые были получены серебряные и золотые медали.",
            "medals-q": "В чем цель медалей?",
            "medals-a": "Медали — это форма вознаграждения, которую пользователь выбирает за выполнение задания. Золотые медали предназначены для очень важных, иногда даже судьбоносных задач, серебряные медали предназначены для задач средней важности, а бронзовые медали являются подходящей наградой для более легких, менее важных задач.",
            "task-q": "Что если задание не будет выполнено вовремя?",
            "task-a": "Просроченные задания будут отмечены красной датой и будут влиять на ваши показатели завершенных заданий. Однако вы все равно можете выполнять эти задания и получать за них награды."
        },
        "LF_ar": {
            "life-champ-q": "ما هو لایف تشَمب؟",
            "life-champ-a": "إنه تطبيق يسمح لك بتعيين المهام اليومية ذات الأهمية المتفاوتة ، وتصور تقدمك على مدار فترة زمنية بناءً على مقدار الميداليات المتراكمة والرسوم البيانية التي تعكس نشاطك والتزامك",
            "keep-track-q": "كيف أقيس إنتاجيتي؟",
            "keep-track-a": "يمكنك القيام بذلك من خلال عرض بيانات النشاط والإحصاءات الخاصة بك لفترات زمنية مختلفة ، وكذلك من خلال الانتقال إلى قسم الإنجازات حيث يمكنك عرض المهام المكتملة التي تم استلام الميداليات الفضية والذهبية من أجلها",
            "medals-q": "ما هو الغرض من الميداليات؟",
            "medals-a": "الميداليات هي شكل من أشكال المكافأة التي يختارها المستخدم لإكمال المهمة. الميداليات الذهبية مخصصة للمهام المهمة جدًا ، وحتى المهام التي تغير الحياة في بعض الأحيان ، والميداليات الفضية مخصصة للمهام ذات الأهمية المتوسطة ، والميداليات البرونزية هي مكافأة مناسبة للمهام الأسهل والأقل أهمية",
            "task-q": "ماذا سيحدث إذا لم تكتمل المهمة في الوقت المحدد؟",
            "task-a": "سيكون للمهام المتأخرة تاريخ استحقاق أحمر وسيؤثر على معدل الاكتمال. ومع ذلك ، لا يزال بإمكانك إكمال هذه المهام والحصول على مكافآت عنها"
        },
        "LF_az": {
            "life-champ-q": "LifeChamp nədir?",
            "life-champ-a": "LifeChamp sizə müxtəlif əhəmiyyətə malik olan gündəlik tapşırıqları təyin etməyə və toplanmış medalların miqdarına və fəaliyyətinizi əks etdirən qrafiklərə əsaslanaraq müəyyən müddət ərzində irəliləyişinizi və intizamınızı vizuallaşdırmağa imkan verən bir proqramdır.",
            "keep-track-q": "Səmərəliliyimi necə ölçmək olar?",
            "keep-track-a": "Siz bunu müxtəlif dövrlər üçün fəaliyyətinizə və statistik məlumatlarınıza baxmaqla, həmçinin nailiyyətlər bölməsinə keçərək, gümüş və qızıl medal qazandıran tapşırıqlara baxmaqla edə bilərsiniz.",
            "medals-q": "Medalların məqsədi nədir?",
            "medals-a": "Medallar istifadəçinin tapşırığı yerinə yetirmək üçün seçdiyi mükafat formasıdır. Qızıl medallar çox vacib, bəzən hətta həyatı dəyişdirən tapşırığlar üçün nəzərdə tutulub, gümüş medallar orta əhəmiyyətli tapşırığlar üçün nəzərdə tutulub, bürünc medallar isə daha asan, böyük əhəmiyyət daşımayan tapşırığlar üçün uyğun bir mükafatdır.",
            "task-q": "Tapşırıq vaxtında yerinə yetirilməsə nə olacaq?",
            "task-a": "Vaxtı keçmiş tapşırıqların son tarixi qırmızı olacaq və tamamlanma nisbətinizə təsir edəcək. Buna baxmayaraq, siz yenə də bu tapşırıqları yerinə yetirib, onların tamamlanması üçün mükafat ala bilərsiniz."
        },
        "LF_sp": {
            "life-champ-q": "¿Qué es LifeChamp?",
            "life-champ-a": "LifeChamp es una aplicación que le permite establecer tareas diarias de diversa importancia y visualizar su progreso durante un período de tiempo basado en la cantidad de medallas acumuladas y gráficos que reflejan su actividad y disciplina.",
            "keep-track-q": "¿Cómo hacer un seguimiento de mi productividad?",
            "keep-track-a": "Puede hacerlo viendo sus datos de actividad y estadísticas para diferentes períodos de tiempo, así como navegando a la sección de logros donde puede ver las tareas completadas por las cuales se recibieron medallas de plata y oro.",
            "medals-q": "¿Cuál es el propósito de las medallas?",
            "medals-a": "Las medallas son una forma de recompensa que el usuario selecciona por completar una tarea. Las medallas de oro están destinadas a tareas muy importantes, los que a veces incluso cambian la vida, las medallas de plata están destinadas a tareas de mediana importancia, mientras que las medallas de bronce son una recompensa adecuada para tareas más fáciles y menos importantes.",
            "task-q": "¿Qué pasa si una tarea no se completa a tiempo?",
            "task-a": "Las tareas atrasadas tendrán una fecha de vencimiento roja y afectarán su tasa de finalización. Sin embargo, aún puede completar estas tareas y recibir recompensas por ellas."
        },
        "LF_fr": {
            "life-champ-q": "Qu'est-ce que LifeChamp?",
            "life-champ-a": "LifeChamp est une application qui vous permet de définir des tâches quotidiennes d'importance variable et de visualiser vos progrès sur une période de temps en fonction du nombre de médailles accumulées et de graphiques reflétant votre activité et votre engagement.",
            "keep-track-q": "Comment suivre ma productivité?",
            "keep-track-a": "Vous pouvez le faire en consultant vos données d'activité et de statistiques pour différentes périodes de temps, ainsi qu'en naviguant vers la section des réalisations où vous pouvez voir les tâches terminées pour lesquelles des médailles d'argent et d'or ont été reçues.",
            "medals-q": "À quoi servent les médailles?",
            "medals-a": "Les médailles sont une forme de récompense que l'utilisateur sélectionne pour avoir accompli une tâche. Les médailles d'or sont destinées à des tâches très importantes, parfois même qui changent la vie, les médailles d'argent sont destinées à des tâches d'importance moyenne, tandis que les médailles de bronze sont une récompense appropriée pour des tâches plus faciles et moins importantes.",
            "task-q": "Que se passera-t-il si une tâche n'est pas effectuée à temps?",
            "task-a": "Les tâches en retard auront une date d'échéance rouge et affecteront votre taux d'achèvement. Cependant, vous pouvez toujours accomplir ces tâches et recevoir des récompenses pour elles."
        },
        "LF_fa": {
            "life-champ-q": "لایف چمپ چیست؟",
            "life-champ-a": "این برنامه ای است که به شما امکان می دهد کارها روزانه با اهمیت متفاوت را تنظیم کنید و پیشرفت خود را در یک دوره زمانی بر اساس میزان مدال ها و نمودارهای جمع آوری شده تجسم کنید که نشان دهنده فعالیت و تعهد شما است",
            "keep-track-q": "چگونه بهره وری خود را پیگیری کنم؟",
            "keep-track-a": "میتوانید با مشاهده فعالیت‌ ها و داده‌ های آماری خود برای دوره‌ های زمانی مختلف، و همچنین با رفتن به بخش دستاورد ها، این کار را انجام دهید، جایی که میتوانید کارهای انجام‌ شده را که مدال‌ های نقره و طلا دریافت کرده‌اند، مشاهده کنید",
            "medals-q": "هدف از مدال ها چیست؟",
            "medals-a": "مدال ها نوعی پاداش هستند که کاربر برای انجام یک کار انتخاب می کند. مدال‌های طلا برای کارهای بسیار مهم و حتی گاهی اوقات تغییر دهنده زندگی هستند، مدال‌های نقره برای کارهای با اهمیت متوسط در نظر گرفته شده‌اند، در حالی که مدال‌های برنز پاداش مناسبی برای کارهای آسان‌تر و کم‌اهمیت هستند",
            "task-q": "اگر یک کار به موقع انجام نشود چه اتفاقی می افتد؟",
            "task-a": "کارهای عقب افتاده دارای تاریخ سررسید قرمز هستند و بر میزان تکمیل شما تأثیر می گذارد. با این حال، شما هنوز هم میتوانید این کارها را انجام دهید و برای آنها جایزه دریافت کنی"
        },
        "LF_tr": {
            "life-champ-q": "LifeChamp nedir?",
            "life-champ-a": "LifeChamp, farklı öneme sahip olan günlük görevler belirlemenize ve birikmiş madalya miktarına ve etkinliğinizi ve taahhüdünüzü yansıtan grafiklere dayalı olarak belirli bir süre içindeki ilerlemenizi görselleştirmenize olanak tanıyan bir uygulamadır.",
            "keep-track-q": "Üretkenliğimi nasıl takip edebilirim?",
            "keep-track-a": "Bunu, farklı zaman dilimleri için etkinlik ve istatistik verilerinize bakarak ve ayrıca gümüş ve altın madalya kazandıran görevleri görebileceğiniz başarılar bölümüne giderek yapabilirsiniz.",
            "medals-q": "Madalyaların amacı nedir?",
            "medals-a": "Madalyalar, kullanıcının bir görevi tamamlamak için seçtiği bir ödül şeklidir. Altın madalyalar çok önemli, hatta bazen hayat değiştiren görevler için, gümüş madalyalar orta önemdeki görevler için, bronz madalyalar ise daha kolay, daha az önemli görevler için uygun bir ödüldür.",
            "task-q": "Bir görev zamanında tamamlanmazsa ne olur?",
            "task-a": "Gecikmiş görevlerin kırmızı bir son tarihi olur ve tamamlanma oranınızı etkiler. Ancak yine de bu görevleri tamamlayabilir ve onlar için ödüller alabilirsiniz."
        },
        "LF_it": {
            "life-champ-q": "Cos'è LifeChamp?",
            "life-champ-a": "LifeChamp è un'app che ti permette di creare compiti quotidiani di varia importanza e visualizzare i tuoi progressi in un periodo di tempo in base alla quantità di medaglie accumulate e grafici che riflettono la tua attività e il tuo impegno.",
            "keep-track-q": "Come monitorare la mia produttività?",
            "keep-track-a": "Puoi farlo visualizzando i tuoi dati di attività e statistiche per diversi periodi di tempo, nonché navigando nella sezione dei realizzazioni dove puoi visualizzare compiti per le quali sono state ricevute medaglie d'argento e d'oro.",
            "medals-q": "A cosa servono le medaglie?",
            "medals-a": "Le medaglie sono una forma di ricompensa che l'utente seleziona per il completamento di un compito. Le medaglie d'oro sono destinate a compiti molto importanti, a volte anche che cambiano la vita, le medaglie d'argento sono pensate per compiti di media importanza, mentre le medaglie di bronzo sono una ricompensa adeguata per compiti più facili e meno importanti.",
            "task-q": "Cosa succederà se un compito non viene completato in tempo?",
            "task-a": "I compiti scaduti avranno una data di scadenza rossa e influiranno sulla percentuale di completamento. Tuttavia, puoi comunque completare questi compiti e ricevere ricompense per essi."
        },
        "LF_ch": {
            "life-champ-q": "LifeChamp 什么是?",
            "life-champ-a": "LifeChamp 是一款应用程序，允许您设置不同重要性的日常任务，并根据累积的奖牌数量和反映您的活动和承诺的图表来可视化您在一段时间内的进步",
            "keep-track-q": "如何跟踪我的生产率？",
            "keep-track-a": "No medals for this period",
            "medals-q": "奖牌有什么用?",
            "medals-a": "奖牌是用户为完成任务而选择的一种奖励形式。 金牌适用于非常重要、有时甚至改变生活的任务，银牌适用于中等重要的任务，而铜牌是对较简单、不太重要的任务的适当奖励",
            "task-q": "如果我没有按时完成任务会怎样?",
            "task-a": "逾期的任务将会有一个红色的截止日期，并会影响您的完成率。 但是，您仍然可以完成这些任务并获得奖励"
        },
    }
    
    return langObj[lang][location]
}


export const LangProvider = ({location, searchPeriodVal}) => {
    const { lang } = useContext(Context)

    const langObj = {
        "LF_en": {
            "username": "Username",
            "password": "Password",
            "login": "Log in",
            "register": "Register",
            "no-account": "Don't have an account yet?",
            "reg-here": "Register",
            "have-account": "Already have an account?",
            "login-here": "Login",
            "login-new-cred": "Please login with your new credentials",
            "user-not-found": "User not found",
            "invalid-reg": "Username and password must be between 4 and 9 characters long and contain only numbers or English letters",
            "user-exists": "User already exists",
            "reg-success": "Registration was successful!",
            "tasks": "Tasks",
            "stats": "Statistics",
            "activity": "Activity",
            "highlights": "Highlights",
            "profile": "Profile",
            "logout": "Logout",
            "reward": "Reward",
            "save": "Save",
            "day": searchPeriodVal === "1" ? "day" : "days",
            "no-tasks": "No tasks yet",
            "no-hl": "No highlights for this period"
        },
        "LF_ru": {
            "username": "Имя пользователя",
            "password": "Пароль",
            "login": "Войти",
            "register": "Зарегистрироваться",
            "no-account": "Нету учетной записи?",
            "reg-here": "Регистрация",
            "have-account": "Уже есть учетная запись?",
            "login-here": "Вход",
            "login-new-cred": "Пожалуйста, войдите используя свои новые реквизиты",
            "user-not-found": "Пользователь не найден",
            "invalid-reg": "Имя пользователя и пароль должны содержать от 4 до 9 символов и состоять только из цифр и Английских букв",
            "user-exists": "Пользователь уже существует",
            "reg-success": "Регистрация прошла успешно!",
            "tasks": "Задания",
            "stats": "Статистика",
            "activity": "Деятельность",
            "highlights": "Достижения",
            "profile": "Профиль",
            "logout": "Выход",
            "reward": "Награда",
            "save": "Сохранить",
            "day": (searchPeriodVal && searchPeriodVal.slice(-1)) === "1" ? "день" : (searchPeriodVal && +searchPeriodVal.slice(-1) && +searchPeriodVal.slice(-1) <= 4) ? "дня" : "дней",
            "no-tasks": "Пока заданий нет",
            "no-hl": "Нет достижений за этот период"
        },
        "LF_ar": {
            "username": "اسم المستخدم",
            "password": "كلمة المرور",
            "login": "تسجيل الدخول",
            "register": "انشاء حساب جديد",
            "no-account": "ليس لديك حساب؟",
            "reg-here": "التسجيل",
            "have-account": "هل لديك حساب؟",
            "login-here": "الدخول",
            "login-new-cred": "الرجاء تسجيل الدخول إلى حسابك الجديد",
            "user-not-found": "المستخدم غير موجود",
            "invalid-reg": "يجب أن يكون اسم المستخدم وكلمة المرور بين ٤ و ٩ أحرف وأن يحتوي على أرقام أو أحرف إنجليزية فقط",
            "user-exists": "المستخدم موجود بالفعل",
            "reg-success": "!تم التسجيل بنجاح!",
            "tasks": "مهام",
            "stats": "إحصائيات",
            "activity": "نشاط",
            "highlights": "إنجازات",
            "profile": "بروفايل",
            "logout": "تسجيل خروج",
            "reward": "جائزة",
            "save": "احفظ",
            "day": searchPeriodVal === "1" ? "يوم" : +searchPeriodVal <= 10 ? "أيام" : "يوما",
            "no-tasks": "ليس لديك أي مهام حتى الآن",
            "no-hl": "لا توجد إنجازات لهذه الفترة"
        },
        "LF_az": {
            "username": "Istifadəçi adı",
            "password": "Şifrə",
            "login": "Daxil olmaq",
            "register": "Qeydiyyatdan keçmək",
            "no-account": "Hesabınız yoxdur?",
            "reg-here": "Qeydiyyat",
            "have-account": "Artıq hesabınız var?",
            "login-here": "Giriş",
            "login-new-cred": "Zəhmət olmasa yeni hesabınıza daxil olun",
            "user-not-found": "Istifadəçi tapılmadı",
            "invalid-reg": "İstifadəçi adı və şifrə 4 və 9 simvol arasında olmalıdır və yalnız rəqəmlərdən və ya ingilis hərflərindən ibarət olmalıdır",
            "user-exists": "Istifadəçi artıq mövcuddur",
            "reg-success": "Qeydiyyat uğurla başa çatdı!",
            "tasks": "Tapşırıqlar",
            "stats": "Statistika",
            "activity": "Fəaliyyət",
            "highlights": "Nailiyyətlər",
            "profile": "Hesab",
            "logout": "Çıxış",
            "reward": "Mükafat",
            "save": "Saxlamaq",
            "day": "gün",
            "no-tasks": "Hələ ki heç bir tapşırığınız yoxdur",
            "no-hl": "Bu dövr üçün heç bir nailiyyət yoxdur"
            
        },
        "LF_sp": {
            "username": "Nombre de usuario",
            "password": "Contraseña",
            "login": "Iniciar sesión",
            "register": "Crear cuenta",
            "no-account": "No tiene una cuenta?",
            "reg-here": "Crear una nueva cuenta",
            "have-account": "Ya tiene una cuenta?",
            "login-here": "Entrar",
            "login-new-cred": "Por favor inicie sesión en su nueva cuenta",
            "user-not-found": "El usuario no existe",
            "invalid-reg": "El nombre de usuario y la contraseña deben tener entre 4 y 9 caracteres y contener solo números o letras inglesas",
            "user-exists": "El usuario ya existe",
            "reg-success": "Su cuenta ha sido creada!",
            "tasks": "Tareas",
            "stats": "Estadísticas",
            "activity": "Actividad",
            "highlights": "Logros",
            "profile": "Perfil",
            "logout": "Cerrar sesión",
            "reward": "Recompensa",
            "save": "Guardar",
            "day": searchPeriodVal === "1" ? "día" : "días",
            "no-tasks": "Aún no tiene ninguna tarea",
            "no-hl": "No hay logros para este período"
        },
        "LF_fr": {
            "username": "Nom d'utilisateur",
            "password": "Mot de passe",
            "login": "Se connecter",
            "register": "S'inscrire",
            "no-account": "Pas de compte?",
            "reg-here": "Création de compte",
            "have-account": "Vous avez déjà un compte?",
            "login-here": "Connexion",
            "login-new-cred": "Veuillez vous connecter avec vos nouveaux identifiants",
            "user-not-found": "L'utilisateur n'a pas été trouvé",
            "invalid-reg": "Le nom d'utilisateur et le mot de passe doivent se composer de 4 à 9 caractères et ne contenir que des chiffres ou des lettres anglaises",
            "user-exists": "L'utilisateur existe déjà",
            "reg-success": "Votre compte a été créé!",
            "tasks": "Tâches",
            "stats": "Statistiques",
            "activity": "Activité",
            "highlights": "Réalisations",
            "profile": "Profil",
            "logout": "Se déconnecter",
            "reward": "Récompense",
            "save": "Enregistrer",
            "day": searchPeriodVal === "1" ? "jour" : "jours",
            "no-tasks": "Vous n'avez pas encore de tâches",
            "no-hl": "Aucune réalisation pour cette période"
        },
        "LF_fa": {
            "username": "نام کاربری",
            "password": "رمز عبور",
            "login": "ورود",
            "register": "ثبت نام",
            "no-account": "حساب کاربری ندارید؟",
            "reg-here": "ایجاد حساب کاربری جدید",
            "have-account": "حساب کاربری دارید؟",
            "login-here": "ورود",
            "login-new-cred": "لطفا وارد حساب کاربری جدید خود شوید",
            "user-not-found": "کاربر وجود ندارد",
            "invalid-reg": "نام کاربری و رمز عبور باید بین ۴ تا ۹ کاراکتر باشد و فقط شامل اعداد یا حروف انگلیسی باشد",
            "user-exists": "کاربر وجود دارد",
            "reg-success": "!حساب کاربری شما ایجاد شده است",
            "tasks": "کارها",
            "stats": "آمار",
            "activity": "فعالیت",
            "highlights": "دستاوردها",
            "profile": "پروفایل",
            "logout": "خروج",
            "reward": "جایزه",
            "save": "ذخیره",
            "day": "روز",
            "no-tasks": "شما هنوز هیچ کاری ای ندارید",
            "no-hl": "هیچ دستاوردی برای این دوره وجود ندارد"
        },
        "LF_tr": {
            "username": "Kullanıcı adı",
            "password": "Şifre",
            "login": "Giriş yap",
            "register": "Kaydol",
            "no-account": "Hesabınız yok mu?",
            "reg-here": "Kaydol",
            "have-account": "Zaten hesabınız var mı?",
            "login-here": "Giriş",
            "login-new-cred": "Lütfen yeni hesabınıza giriş yapın",
            "user-not-found": "Kullanıcı bulunamadı",
            "invalid-reg": "Kullanıcı adı ve şifre 4-9 karakter uzunluğunda olmalı ve sadece rakamlardan veya İngilizce harflerden oluşmalıdır",
            "user-exists": "Kullanıcı kayıtlı bulunuyor",
            "reg-success": "Hesabınız oluşturuldu!",
            "tasks": "Görevler",
            "stats": "İstatistik",
            "activity": "Etkinlik",
            "highlights": "Başarılar",
            "profile": "Profil",
            "logout": "Çıkış yap",
            "reward": "Ödül",
            "save": "Kaydet",
            "day": "gün",
            "no-tasks": "Henüz göreviniz yok",
            "no-hl": "Bu dönem için başarı yok"
        },
        "LF_it": {
            "username": "Nome utente",
            "password": "Password",
            "login": "Accedi",
            "register": "Registrati",
            "no-account": "Non hai un account?",
            "reg-here": "Registrazione",
            "have-account": "Hai un account?",
            "login-here": "Accesso",
            "login-new-cred": "Per favore accedi con le tue nuove credenziali",
            "user-not-found": "Utente non trovato",
            "invalid-reg": "Il nome utente e la password devono avere una lunghezza compresa tra 4 e 9 caratteri e contenere solo numeri o lettere inglesi",
            "user-exists": "L'utente è già registrato",
            "reg-success": "L'account è stato creato!",
            "tasks": "Compiti",
            "stats": "Statistica",
            "activity": "Attività",
            "highlights": "Realizzazioni",
            "profile": "Profilo",
            "logout": "Esci",
            "reward": "Ricompensa",
            "save": "Salvare",
            "day": searchPeriodVal === "1" ? "giorno" : "giorni",
            "no-tasks": "Non hai ancora nessun compito",
            "no-hl": "Nessun realizzazione per questo periodo"
        },
        "LF_ch": {
            "username": "用户名",
            "password": "密码",
            "login": "登录",
            "register": "注册",
            "no-account": "还没有账户?",
            "reg-here": "注册",
            "have-account": "有一个账户?",
            "login-here": "注册",
            "login-new-cred": "请登录您的新账户",
            "user-not-found": "用户不存在",
            "invalid-reg": "用户名和密码长度必须在 4 到 9 个字符之间，并且只能包含英文字母或数字",
            "user-exists": "用户已存在",
            "reg-success": "注册成功!",
            "tasks": "任务",
            "stats": "统计",
            "activity": "最近活动",
            "highlights": "成就",
            "profile": "账户",
            "logout": "登出",
            "reward": "奖励",
            "save": "保存",
            "day": "天",
            "no-tasks": "您还没有任何任务",
            "no-hl": "在此期间没有任何成就"
        },
    }
    
  return langObj[lang][location]
  
}