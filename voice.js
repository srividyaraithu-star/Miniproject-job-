function getSelectedLanguage() {
    const supportedLanguages = ["en", "te", "hi"];
    const storedLanguage = localStorage.getItem("language");

    if (supportedLanguages.includes(storedLanguage)) {
        return storedLanguage;
    }

    const pathLanguage = window.location.pathname.replace("/", "");
    if (supportedLanguages.includes(pathLanguage)) {
        localStorage.setItem("language", pathLanguage);
        return pathLanguage;
    }

    const pageLanguage = document.documentElement.lang;
    if (supportedLanguages.includes(pageLanguage)) {
        return pageLanguage;
    }

    return "en";
}

function getSpeechLanguage() {
    return getSpeechLanguages()[0];
}

function getSpeechLanguages() {
    const lang = getSelectedLanguage();

    if (lang === "te") {
        return ["te-IN", "te"];
    }
    if (lang === "hi") {
        return ["hi-IN", "hi"];
    }

    return ["en-IN", "en-US", "en"];
}

function getVoiceText(key) {
    const lang = getSelectedLanguage();
    const text = {
        en: {
            welcomeGuide: "Welcome to job portal. First select your language. Then register or login. After that click Start Using App to find jobs based on your skills.",
            languageChanged: "Language selected. This website will now speak and show text in English.",
            loginGuide: "This is the login page. Enter your username and password, then click login.",
            registerGuide: "This is the register page. Enter your name, password, location, and skills. Then click register.",
            searchGuide: "This is the job search page. Enter your skill and location, or click Speak and say your skill and location.",
            dashboardGuide: "This is your dashboard. You can check your profile, recommended jobs, quick search, or open required skills.",
            addJobGuide: "This is the add job page. Enter job title, required skills, and location.",
            allJobsGuide: "This page shows all available jobs.",
            requiredSkillsGuide: "This page shows required skills for unskilled and skilled jobs. Use it to choose the best job for your skills.",
            resultFound: "Jobs found for your skills. Please check the list.",
            resultNotFound: "No jobs found. Try another skill or nearby location.",
            resultSearchFirst: "Please enter your skill and location first to search jobs.",
            listening: "Listening... say your skill and location.",
            notSupported: "Voice recognition works best in Google Chrome.",
            heard: "You said: ",
            filled: "Skill and location added. Click Find Jobs.",
            inputFilled: "Input added.",
            missingLocation: "Skill added. Please say or type location.",
            error: "Voice input stopped. Please try again."
        },
        te: {
            welcomeGuide: "జాబ్ పోర్టల్ కు స్వాగతం. ముందుగా మీ భాషను ఎంచుకోండి. తరువాత రిజిస్టర్ లేదా లాగిన్ చేయండి. ఆ తరువాత మీ నైపుణ్యాల ఆధారంగా ఉద్యోగాలు కనుగొనడానికి యాప్ ప్రారంభించండి బటన్ నొక్కండి.",
            languageChanged: "భాష ఎంచుకున్నారు. ఇకపై ఈ వెబ్ సైట్ తెలుగు లో మాట్లాడుతుంది మరియు చూపిస్తుంది.",
            loginGuide: "ఇది లాగిన్ పేజీ. మీ వాడుకరి పేరు మరియు పాస్ వర్డ్ నమోదు చేసి లాగిన్ నొక్కండి.",
            registerGuide: "ఇది రిజిస్టర్ పేజీ. మీ పేరు, పాస్ వర్డ్, స్థానం, నైపుణ్యాలు నమోదు చేసి రిజిస్టర్ నొక్కండి.",
            searchGuide: "ఇది ఉద్యోగ శోధన పేజీ. మీ నైపుణ్యం మరియు స్థానం నమోదు చేయండి, లేదా మాట్లాడండి బటన్ నొక్కి మీ నైపుణ్యం మరియు స్థానం చెప్పండి.",
            dashboardGuide: "ఇది మీ డాష్‌బోర్డ్. ఇక్కడ మీ ప్రొఫైల్, సిఫార్సు చేసిన ఉద్యోగాలు, త్వరిత శోధన, అవసరమైన నైపుణ్యాలు చూడవచ్చు.",
            addJobGuide: "ఇది ఉద్యోగం జోడించే పేజీ. ఉద్యోగ శీర్షిక, అవసరమైన నైపుణ్యాలు, మరియు స్థానం నమోదు చేయండి.",
            allJobsGuide: "ఈ పేజీలో అందుబాటులో ఉన్న అన్ని ఉద్యోగాలు కనిపిస్తాయి.",
            requiredSkillsGuide: "ఈ పేజీలో నైపుణ్యం తక్కువగా అవసరమైన మరియు నైపుణ్యం అవసరమైన ఉద్యోగాలకు కావలసిన నైపుణ్యాలు కనిపిస్తాయి.",
            resultFound: "మీ నైపుణ్యాలకు సరిపోయే ఉద్యోగాలు కనబడ్డాయి. దయచేసి జాబితా చూడండి.",
            resultNotFound: "ఉద్యోగాలు కనబడలేదు. వేరే నైపుణ్యం లేదా దగ్గరలోని స్థానం ప్రయత్నించండి.",
            resultSearchFirst: "ఉద్యోగాల కోసం ముందుగా మీ నైపుణ్యం మరియు స్థానం నమోదు చేయండి.",
            listening: "\u0c35\u0c3f\u0c02\u0c1f\u0c41\u0c28\u0c4d\u0c28\u0c3e\u0c28\u0c41... \u0c2e\u0c40 \u0c28\u0c48\u0c2a\u0c41\u0c23\u0c4d\u0c2f\u0c02 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c02 \u0c1a\u0c46\u0c2a\u0c4d\u0c2a\u0c02\u0c21\u0c3f.",
            notSupported: "\u0c35\u0c3e\u0c2f\u0c3f\u0c38\u0c4d \u0c17\u0c41\u0c30\u0c4d\u0c24\u0c3f\u0c02\u0c2a\u0c41 Google Chrome \u0c32\u0c4b \u0c2c\u0c3e\u0c17\u0c3e \u0c2a\u0c28\u0c3f\u0c1a\u0c47\u0c38\u0c4d\u0c24\u0c41\u0c02\u0c26\u0c3f.",
            heard: "\u0c2e\u0c40\u0c30\u0c41 \u0c1a\u0c46\u0c2a\u0c4d\u0c2a\u0c3f\u0c02\u0c26\u0c3f: ",
            filled: "\u0c28\u0c48\u0c2a\u0c41\u0c23\u0c4d\u0c2f\u0c02 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c02 \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a\u0c2c\u0c21\u0c4d\u0c21\u0c3e\u0c2f\u0c3f. \u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c3e\u0c32\u0c41 \u0c35\u0c46\u0c24\u0c15\u0c02\u0c21\u0c3f.",
            inputFilled: "\u0c07\u0c28\u0c4d\u0c2a\u0c41\u0c1f\u0c4d \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a\u0c2c\u0c21\u0c3f\u0c02\u0c26\u0c3f.",
            missingLocation: "\u0c28\u0c48\u0c2a\u0c41\u0c23\u0c4d\u0c2f\u0c02 \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a\u0c2c\u0c21\u0c3f\u0c02\u0c26\u0c3f. \u0c26\u0c2f\u0c1a\u0c47\u0c38\u0c3f \u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c02 \u0c1a\u0c46\u0c2a\u0c4d\u0c2a\u0c02\u0c21\u0c3f \u0c32\u0c47\u0c26\u0c3e \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f.",
            error: "\u0c35\u0c3e\u0c2f\u0c3f\u0c38\u0c4d \u0c06\u0c17\u0c3f\u0c02\u0c26\u0c3f. \u0c2e\u0c33\u0c4d\u0c32\u0c40 \u0c2a\u0c4d\u0c30\u0c2f\u0c24\u0c4d\u0c28\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f."
        },
        hi: {
            welcomeGuide: "जॉब पोर्टल में आपका स्वागत है। पहले अपनी भाषा चुनें। फिर रजिस्टर या लॉगिन करें। उसके बाद अपने कौशल के आधार पर नौकरी खोजने के लिए स्टार्ट यूजिंग ऐप पर क्लिक करें.",
            languageChanged: "भाषा चुनी गई। अब यह वेबसाइट हिंदी में बोलेगी और दिखाई देगी.",
            loginGuide: "यह लॉगिन पेज है। अपना उपयोगकर्ता नाम और पासवर्ड दर्ज करें, फिर लॉगिन पर क्लिक करें.",
            registerGuide: "यह रजिस्टर पेज है। अपना नाम, पासवर्ड, स्थान और कौशल दर्ज करें। फिर रजिस्टर पर क्लिक करें.",
            searchGuide: "यह नौकरी खोज पेज है। अपना कौशल और स्थान दर्ज करें, या बोलें बटन दबाकर अपना कौशल और स्थान बोलें.",
            dashboardGuide: "यह आपका डैशबोर्ड है। यहां आप अपनी प्रोफाइल, सुझाई गई नौकरियां, त्वरित खोज और आवश्यक कौशल देख सकते हैं.",
            addJobGuide: "यह नौकरी जोड़ने का पेज है। नौकरी का नाम, आवश्यक कौशल और स्थान दर्ज करें.",
            allJobsGuide: "इस पेज पर सभी उपलब्ध नौकरियां दिखाई देती हैं.",
            requiredSkillsGuide: "इस पेज पर अकुशल और कुशल नौकरियों के लिए आवश्यक कौशल दिखाई देते हैं। सही नौकरी चुनने के लिए इसका उपयोग करें.",
            resultFound: "आपके कौशल के लिए नौकरियां मिली हैं। कृपया सूची देखें.",
            resultNotFound: "कोई नौकरी नहीं मिली। दूसरा कौशल या पास का स्थान आजमाएं.",
            resultSearchFirst: "नौकरी खोजने के लिए पहले अपना कौशल और स्थान दर्ज करें.",
            listening: "\u0938\u0941\u0928 \u0930\u0939\u093e \u0939\u0942\u0902... \u0905\u092a\u0928\u093e \u0915\u094c\u0936\u0932 \u0914\u0930 \u0938\u094d\u0925\u093e\u0928 \u092c\u094b\u0932\u0947\u0902.",
            notSupported: "\u0935\u0949\u092f\u0938 \u0930\u093f\u0915\u0917\u094d\u0928\u093f\u0936\u0928 Google Chrome \u092e\u0947\u0902 \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948.",
            heard: "\u0906\u092a\u0928\u0947 \u0915\u0939\u093e: ",
            filled: "\u0915\u094c\u0936\u0932 \u0914\u0930 \u0938\u094d\u0925\u093e\u0928 \u091c\u094b\u0921\u093c \u0926\u093f\u090f \u0917\u090f. Find Jobs \u092a\u0930 \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0947\u0902.",
            inputFilled: "\u0907\u0928\u092a\u0941\u091f \u091c\u094b\u0921\u093c \u0926\u093f\u092f\u093e \u0917\u092f\u093e.",
            missingLocation: "\u0915\u094c\u0936\u0932 \u091c\u094b\u0921\u093c \u0926\u093f\u092f\u093e \u0917\u092f\u093e. \u0915\u0943\u092a\u092f\u093e \u0938\u094d\u0925\u093e\u0928 \u092c\u094b\u0932\u0947\u0902 \u092f\u093e \u091f\u093e\u0907\u092a \u0915\u0930\u0947\u0902.",
            error: "\u0935\u0949\u092f\u0938 \u0907\u0928\u092a\u0941\u091f \u0930\u0941\u0915 \u0917\u092f\u093e. \u092b\u093f\u0930 \u0915\u094b\u0936\u093f\u0936 \u0915\u0930\u0947\u0902."
        }
    };

    return (text[lang] || text.en)[key];
}

let targetVoiceInputId = "";

function setVoiceStatus(message) {
    const status = document.getElementById("voice_status");
    if (status) {
        status.textContent = message;
    }
}

function speak(text, retryCount = 0) {
    if (!window.speechSynthesis || !text) {
        return;
    }

    window.speechSynthesis.cancel();

    const speechLanguage = getSpeechLanguage();
    const voice = getMatchingVoice(speechLanguage);
    const shouldWaitForVoice = !voice
        && speechLanguage !== "en-IN"
        && retryCount < 5
        && window.speechSynthesis.getVoices().length === 0;

    if (shouldWaitForVoice) {
        window.setTimeout(() => speak(text, retryCount + 1), 250);
        return;
    }

    const message = new SpeechSynthesisUtterance(text);
    message.lang = speechLanguage;
    message.rate = 0.9;

    if (voice) {
        message.voice = voice;
    }
    window.speechSynthesis.speak(message);
}

function getMatchingVoice(language) {
    if (!window.speechSynthesis) {
        return null;
    }

    const voices = window.speechSynthesis.getVoices();
    const shortLanguage = language.split("-")[0];

    return voices.find(voice => voice.lang === language)
        || voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith(shortLanguage))
        || null;
}

function speakPageGuide() {
    const guideKey = getPageGuideKey();

    if (!guideKey) {
        return;
    }

    window.setTimeout(() => {
        speak(getVoiceText(guideKey));
    }, 700);
}

function getPageGuideKey() {
    const path = window.location.pathname;
    const resultState = document.body.getAttribute("data-result-state");

    if (path === "/welcome") {
        return "welcomeGuide";
    }
    if (path === "/login") {
        return "loginGuide";
    }
    if (path === "/register") {
        return "registerGuide";
    }
    if (path === "/" || path === "/en" || path === "/te" || path === "/hi") {
        return "searchGuide";
    }
    if (path === "/add_job") {
        return "addJobGuide";
    }
    if (path === "/dashboard") {
        return "dashboardGuide";
    }
    if (path === "/all_jobs") {
        return "allJobsGuide";
    }
    if (path === "/required_skills") {
        return "requiredSkillsGuide";
    }
    if (path === "/result") {
        if (resultState === "found") {
            return "resultFound";
        }
        if (resultState === "not-found") {
            return "resultNotFound";
        }
        return "resultSearchFirst";
    }

    return "";
}

function announceLanguageChange() {
    const guideKey = getPageGuideKey();
    speak(getVoiceText(guideKey || "languageChanged"));
}

function getVoiceErrorMessage(event, language) {
    const errorName = event && event.error ? ` (${event.error})` : "";
    return `${getVoiceText("error")} Language: ${language}${errorName}`;
}

function startVoice(targetInputId = "") {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert(getVoiceText("notSupported"));
        return;
    }

    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    targetVoiceInputId = targetInputId;
    const speechLanguages = getSpeechLanguages();
    startSpeechRecognition(SpeechRecognition, speechLanguages, 0);
}

function startSpeechRecognition(SpeechRecognition, speechLanguages, attemptIndex) {
    const speechLanguage = speechLanguages[attemptIndex] || speechLanguages[0];
    let heardResult = false;

    setVoiceStatus(`${getVoiceText("listening")} (${speechLanguage})`);

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognition.lang = speechLanguage;

    recognition.onstart = function() {
        setVoiceStatus(`${getVoiceText("listening")} (${recognition.lang})`);
    };

    recognition.onresult = function(event) {
        heardResult = true;
        const text = event.results[0][0].transcript.trim();
        const lowerText = text.toLowerCase();

        setVoiceStatus(getVoiceText("heard") + text);
        if (fillTargetInput(text)) {
            return;
        }

        if (handleCommand(lowerText)) {
            return;
        }

        if (!fillJobSearch(text)) {
            fillActiveInput(text);
        }
    };

    recognition.onerror = function(event) {
        const canRetryLanguage = event
            && event.error === "language-not-supported"
            && attemptIndex + 1 < speechLanguages.length;

        if (canRetryLanguage) {
            startSpeechRecognition(SpeechRecognition, speechLanguages, attemptIndex + 1);
            return;
        }

        setVoiceStatus(getVoiceErrorMessage(event, recognition.lang));
    };

    recognition.onend = function() {
        if (!heardResult) {
            return;
        }
    };

    try {
        recognition.start();
    } catch (error) {
        setVoiceStatus(getVoiceErrorMessage(error, recognition.lang));
    }
}

function fillTargetInput(text) {
    if (!targetVoiceInputId) {
        return false;
    }

    const input = document.getElementById(targetVoiceInputId);
    targetVoiceInputId = "";

    if (!input) {
        return false;
    }

    input.value = cleanVoiceInputForField(input, text);
    input.focus();
    setVoiceStatus(getVoiceText("inputFilled"));
    return true;
}

function cleanVoiceInputForField(input, text) {
    if (input.type === "password") {
        return text.replace(/\s+/g, "");
    }

    return text.trim();
}

function fillActiveInput(text) {
    const active = document.activeElement;

    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
        active.value = text;
        return true;
    }

    return false;
}

function fillJobSearch(text) {
    const skillInput = document.getElementById("skill_input");
    const locationInput = document.getElementById("location_input");

    if (!skillInput || !locationInput || !text) {
        return false;
    }

    const parsed = parseSkillAndLocation(text);
    skillInput.value = parsed.skill;
    locationInput.value = parsed.location;

    if (parsed.skill && parsed.location) {
        setVoiceStatus(getVoiceText("filled"));
        speak(getVoiceText("filled"));
    } else {
        setVoiceStatus(getVoiceText("missingLocation"));
        speak(getVoiceText("missingLocation"));
    }

    return true;
}

function parseSkillAndLocation(text) {
    let cleaned = text
        .replace(/[,.!?]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const lower = cleaned.toLowerCase();
    const separators = [
        " in ",
        " at ",
        " near ",
        " location ",
        " place ",
        " jobs in ",
        " job in ",
        " \u0c32\u0c4b ",
        " \u0c32\u0c4b\u0c28\u0c3f ",
        " \u0c26\u0c17\u0c4d\u0c17\u0c30 ",
        " \u0c26\u0c17\u0c4d\u0c17\u0c30\u0c32\u0c4b ",
        " \u0c15\u0c4b\u0c38\u0c02 ",
        " \u092e\u0947\u0902 ",
        " \u0915\u0947 \u092a\u093e\u0938 ",
        " \u0915\u0947 \u0932\u093f\u090f ",
        " \u0928\u091c\u0926\u0940\u0915 "
    ];

    for (const separator of separators) {
        const index = lower.indexOf(separator);
        if (index > -1) {
            return {
                skill: cleanSkill(cleaned.slice(0, index)),
                location: cleaned.slice(index + separator.length).trim()
            };
        }
    }

    const words = cleaned.split(" ");
    if (words.length === 1) {
        return { skill: cleaned, location: "" };
    }

    return {
        skill: cleanSkill(words.slice(0, -1).join(" ")),
        location: words[words.length - 1]
    };
}

function cleanSkill(skill) {
    return skill
        .replace(/\b(find|search|job|jobs|work|for|need|want)\b/gi, " ")
        .replace(/(\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c02|\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c3e\u0c32\u0c41|\u0c2a\u0c28\u0c3f|\u0c35\u0c46\u0c24\u0c15\u0c02\u0c21\u0c3f|\u0c15\u0c3e\u0c35\u0c3e\u0c32\u0c3f|\u0c15\u0c4b\u0c38\u0c02)/g, " ")
        .replace(/(\u0928\u094c\u0915\u0930\u0940|\u0928\u094c\u0915\u0930\u093f\u092f\u093e\u0902|\u0915\u093e\u092e|\u0916\u094b\u091c\u0947\u0902|\u091a\u093e\u0939\u093f\u090f|\u0915\u0947 \u0932\u093f\u090f)/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeVoiceCommand(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function hasAnyCommand(text, phrases) {
    return phrases.some(phrase => text.includes(phrase));
}

function handleCommand(text) {
    const command = normalizeVoiceCommand(text);

    if (hasAnyCommand(command, [
        "login",
        "log in",
        "\u0c32\u0c3e\u0c17\u0c3f\u0c28\u0c4d",
        "\u0932\u0949\u0917\u093f\u0928",
        "\u0932\u094b\u0917\u093f\u0928"
    ])) {
        window.location.href = "/login";
        return true;
    }

    if (hasAnyCommand(command, [
        "register",
        "registration",
        "sign up",
        "signup",
        "\u0c30\u0c3f\u0c1c\u0c3f\u0c38\u0c4d\u0c1f\u0c30\u0c4d",
        "\u0930\u091c\u093f\u0938\u094d\u091f\u0930",
        "\u092a\u0902\u091c\u0940\u0915\u0930\u0923"
    ])) {
        window.location.href = "/register";
        return true;
    }

    if (hasAnyCommand(command, [
        "add job",
        "add jobs",
        "add jon",
        "add john",
        "add new job",
        "job add",
        "\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c02 \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a",
        "\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c02 \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",
        "\u0c1c\u0c3e\u0c2c\u0c4d \u0c1c\u0c4b\u0c21\u0c3f\u0c02\u0c1a",
        "\u0928\u094c\u0915\u0930\u0940 \u091c\u094b\u0921",
        "\u091c\u0949\u092c \u091c\u094b\u0921",
        "\u091c\u094b\u0921\u093c\u0947\u0902"
    ])) {
        window.location.href = "/add_job";
        return true;
    }

    if (hasAnyCommand(command, [
        "all jobs",
        "all job",
        "all job portal",
        "job portal",
        "show jobs",
        "view jobs",
        "available jobs",
        "\u0c05\u0c28\u0c4d\u0c28\u0c3f \u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17",
        "\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c3e\u0c32 \u0c2a\u0c4b\u0c30\u0c4d\u0c1f\u0c32\u0c4d",
        "\u0c1c\u0c3e\u0c2c\u0c4d \u0c2a\u0c4b\u0c30\u0c4d\u0c1f\u0c32\u0c4d",
        "\u0938\u092d\u0940 \u0928\u094c\u0915\u0930",
        "\u0938\u093e\u0930\u0940 \u0928\u094c\u0915\u0930",
        "\u091c\u0949\u092c \u092a\u094b\u0930\u094d\u091f\u0932"
    ])) {
        window.location.href = "/all_jobs";
        return true;
    }

    if (hasAnyCommand(command, [
        "dashboard",
        "dash board",
        "\u0c21\u0c3e\u0c37\u0c4d\u0c2c\u0c4b\u0c30\u0c4d\u0c21\u0c4d",
        "\u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921"
    ])) {
        window.location.href = "/dashboard";
        return true;
    }

    if (hasAnyCommand(command, [
        "required skills",
        "skill guide",
        "know required skills",
        "skills required",
        "\u0c05\u0c35\u0c38\u0c30\u0c2e\u0c48\u0c28 \u0c28\u0c48\u0c2a\u0c41\u0c23\u0c4d\u0c2f\u0c3e\u0c32\u0c41",
        "\u0c28\u0c48\u0c2a\u0c41\u0c23\u0c4d\u0c2f\u0c3e\u0c32\u0c41 \u0c24\u0c46\u0c32\u0c41\u0c38\u0c41\u0c15\u0c4b\u0c02\u0c21\u0c3f",
        "\u0906\u0935\u0936\u094d\u092f\u0915 \u0915\u094c\u0936\u0932",
        "\u091c\u0930\u0942\u0930\u0940 \u0915\u094c\u0936\u0932"
    ])) {
        window.location.href = "/required_skills";
        return true;
    }

    if (hasAnyCommand(command, [
        "start using app",
        "start app",
        "open app",
        "use app",
        "find jobs",
        "search jobs",
        "\u0c2f\u0c3e\u0c2a\u0c4d \u0c2a\u0c4d\u0c30\u0c3e\u0c30\u0c02\u0c2d",
        "\u0c2f\u0c3e\u0c2a\u0c4d \u0c36\u0c41\u0c30\u0c42",
        "\u0c09\u0c26\u0c4d\u0c2f\u0c4b\u0c17\u0c3e\u0c32\u0c41 \u0c35\u0c46\u0c24\u0c15",
        "\u090f\u092a \u0936\u0941\u0930\u0942",
        "\u090f\u092a \u0916\u094b\u0932",
        "\u0928\u094c\u0915\u0930\u0940 \u0916\u094b\u091c"
    ])) {
        window.location.href = "/";
        return true;
    }

    if (hasAnyCommand(command, [
        "home",
        "welcome",
        "\u0c39\u0c4b\u0c2e\u0c4d",
        "\u0c38\u0c4d\u0c35\u0c3e\u0c17\u0c24\u0c02",
        "\u0939\u094b\u092e",
        "\u0935\u0947\u0932\u0915\u092e"
    ])) {
        window.location.href = "/welcome";
        return true;
    }

    return false;
}

document.addEventListener("DOMContentLoaded", speakPageGuide);
