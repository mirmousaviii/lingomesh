import { Language } from "../../hooks/useTranslations";
import { useTranslation } from "../../constants/translations";
import GermanArticlesWidget, {
  articleQuizQuestions,
} from "../../components/widgets/GermanArticlesWidget/GermanArticlesWidget";
import {
  QuizWidget,
  type QuizQuestion,
} from "../../components/widgets/QuizWidget";
import PageLayout from "../../components/layout/PageLayout";
import AudioButton from "../../components/ui/AudioButton/AudioButton";
import Box from "../../components/ui/Box/Box";

interface ArticlesProps {
  language: Language;
  onPageChange?: (page: string) => void;
}

const Articles: React.FC<ArticlesProps> = ({ language }) => {
  const t = useTranslation(language);
  const isGerman = language === "de";

  // Article explanations
  const articleRules = [
    {
      title: isGerman ? "Der Artikel" : "The Article",
      description: isGerman
        ? "Artikel stehen vor Substantiven und zeigen das Geschlecht (maskulin, feminin, neutral) und den Fall (Nominativ, Akkusativ, Dativ, Genitiv) an."
        : "Articles come before nouns and indicate gender (masculine, feminine, neuter) and case (nominative, accusative, dative, genitive).",
      examples: ["der Mann", "die Frau", "das Kind"],
    },
    {
      title: isGerman ? "Bestimmte Artikel" : "Definite Articles",
      description: isGerman
        ? "Der, die, das - werden verwendet, wenn über etwas Bestimmtes gesprochen wird."
        : "Der, die, das - used when talking about something specific.",
      examples: [
        "der Hund (the dog)",
        "die Katze (the cat)",
        "das Haus (the house)",
      ],
    },
    {
      title: isGerman ? "Unbestimmte Artikel" : "Indefinite Articles",
      description: isGerman
        ? "Ein, eine, ein - werden verwendet, wenn über etwas Unbestimmtes gesprochen wird."
        : "Ein, eine, ein - used when talking about something indefinite.",
      examples: [
        "ein Mann (a man)",
        "eine Frau (a woman)",
        "ein Kind (a child)",
      ],
    },
  ];

  // Common nouns with articles
  const commonNouns = [
    { german: "der Mann", english: "the man", gender: "masculine" },
    { german: "die Frau", english: "the woman", gender: "feminine" },
    { german: "das Kind", english: "the child", gender: "neuter" },
    { german: "der Hund", english: "the dog", gender: "masculine" },
    { german: "die Katze", english: "the cat", gender: "feminine" },
    { german: "das Haus", english: "the house", gender: "neuter" },
    { german: "der Tag", english: "the day", gender: "masculine" },
    { german: "die Nacht", english: "the night", gender: "feminine" },
    { german: "das Auto", english: "the car", gender: "neuter" },
    { german: "der Freund", english: "the friend (m)", gender: "masculine" },
    { german: "die Freundin", english: "the friend (f)", gender: "feminine" },
    { german: "das Buch", english: "the book", gender: "neuter" },
  ];

  // Speech synthesis function
  const speakGerman = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "masculine":
        return "text-blue-600 dark:text-blue-400";
      case "feminine":
        return "text-pink-600 dark:text-pink-400";
      case "neuter":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-neutral-700 dark:text-neutral-300";
    }
  };

  // Convert articleQuizQuestions to QuizQuestion format
  const quizQuestions: QuizQuestion[] = articleQuizQuestions.map((q) => ({
    question: language === "de" ? q.question : q.questionEn,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: language === "de" ? q.explanation : q.explanationEn,
  }));

  return (
    <PageLayout>
      {/* German Articles Widget */}
      <GermanArticlesWidget language={language} />

      {/* Article Rules Section */}
      <Box
        title={isGerman ? "Artikel-Regeln" : "Article Rules"}
        description={
          isGerman
            ? "Grundlegende Regeln für deutsche Artikel"
            : "Basic rules for German articles"
        }
        headerColor="blue"
      >
        <div className="space-y-4">
          {articleRules.map((rule, index) => (
            <div
              key={index}
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {rule.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {rule.description}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                <div className="space-y-2">
                  {rule.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="font-mono text-sm text-blue-700 dark:text-blue-300">
                        {example}
                      </span>
                      <AudioButton
                        onClick={() => speakGerman(example.split(" (")[0])}
                        title={t.ui.listen}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>

      {/* Common Nouns Section */}
      <Box
        title={isGerman ? "Häufige Substantive" : "Common Nouns"}
        description={
          isGerman
            ? "Die wichtigsten Wörter mit ihren Artikeln"
            : "The most important words with their articles"
        }
        headerColor="purple"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commonNouns.map((noun, index) => (
            <div
              key={index}
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div
                    className={`text-sm font-semibold ${getGenderColor(
                      noun.gender
                    )} mb-1`}
                  >
                    {noun.german}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {noun.english}
                  </div>
                  <div className="text-xs text-neutral-500 capitalize">
                    {noun.gender}
                  </div>
                </div>
                <AudioButton
                  onClick={() => speakGerman(noun.german)}
                  title={t.ui.listen}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </Box>

      {/* Article Cases Section */}
      <Box
        title={isGerman ? "Artikel-Fälle" : "Article Cases"}
        description={
          isGerman
            ? "Artikel in verschiedenen Fällen"
            : "Articles in different cases"
        }
        headerColor="green"
      >
        <div className="space-y-6">
          {/* Masculine Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              {isGerman ? "Maskulin (der)" : "Masculine (der)"}
            </h3>
            <div className="space-y-3">
              {[
                {
                  german: "Der Mann liest.",
                  english: "The man reads.",
                  case: "Nominativ",
                },
                {
                  german: "Ich sehe den Mann.",
                  english: "I see the man.",
                  case: "Akkusativ",
                },
                {
                  german: "Ich gebe dem Mann ein Buch.",
                  english: "I give the man a book.",
                  case: "Dativ",
                },
                {
                  german: "Das ist das Auto des Mannes.",
                  english: "That is the man's car.",
                  case: "Genitiv",
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {example.german}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {example.english}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {example.case}
                      </div>
                    </div>
                    <AudioButton
                      onClick={() => speakGerman(example.german)}
                      title={isGerman ? "Anhören" : "Listen"}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feminine Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
              {isGerman ? "Feminin (die)" : "Feminine (die)"}
            </h3>
            <div className="space-y-3">
              {[
                {
                  german: "Die Frau arbeitet.",
                  english: "The woman works.",
                  case: "Nominativ",
                },
                {
                  german: "Ich sehe die Frau.",
                  english: "I see the woman.",
                  case: "Akkusativ",
                },
                {
                  german: "Ich gebe der Frau eine Blume.",
                  english: "I give the woman a flower.",
                  case: "Dativ",
                },
                {
                  german: "Das ist das Haus der Frau.",
                  english: "That is the woman's house.",
                  case: "Genitiv",
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {example.german}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {example.english}
                      </div>
                      <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                        {example.case}
                      </div>
                    </div>
                    <AudioButton
                      onClick={() => speakGerman(example.german)}
                      title={isGerman ? "Anhören" : "Listen"}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neuter Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              {isGerman ? "Neutrum (das)" : "Neuter (das)"}
            </h3>
            <div className="space-y-3">
              {[
                {
                  german: "Das Kind spielt.",
                  english: "The child plays.",
                  case: "Nominativ",
                },
                {
                  german: "Ich sehe das Kind.",
                  english: "I see the child.",
                  case: "Akkusativ",
                },
                {
                  german: "Ich gebe dem Kind ein Spielzeug.",
                  english: "I give the child a toy.",
                  case: "Dativ",
                },
                {
                  german: "Das ist das Zimmer des Kindes.",
                  english: "That is the child's room.",
                  case: "Genitiv",
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {example.german}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {example.english}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        {example.case}
                      </div>
                    </div>
                    <AudioButton
                      onClick={() => speakGerman(example.german)}
                      title={isGerman ? "Anhören" : "Listen"}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plural Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              {isGerman ? "Plural (die)" : "Plural (die)"}
            </h3>
            <div className="space-y-3">
              {[
                {
                  german: "Die Kinder spielen.",
                  english: "The children play.",
                  case: "Nominativ",
                },
                {
                  german: "Ich sehe die Kinder.",
                  english: "I see the children.",
                  case: "Akkusativ",
                },
                {
                  german: "Ich gebe den Kindern Süßigkeiten.",
                  english: "I give the children candy.",
                  case: "Dativ",
                },
                {
                  german: "Das sind die Spielzeuge der Kinder.",
                  english: "Those are the children's toys.",
                  case: "Genitiv",
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {example.german}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {example.english}
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        {example.case}
                      </div>
                    </div>
                    <AudioButton
                      onClick={() => speakGerman(example.german)}
                      title={isGerman ? "Anhören" : "Listen"}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>

      {/* Quiz Widget - Last Component */}
      <QuizWidget
        language={language}
        questions={quizQuestions}
        subject="articles"
      />
    </PageLayout>
  );
};

export default Articles;
