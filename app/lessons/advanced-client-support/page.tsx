"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ScenarioResult = {
  feedback: string;
  coachingTip: string;
  score: number;
};

export default function AdvancedClientSupportPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const [internetResponse, setInternetResponse] = useState("");
  const [internetFeedback, setInternetFeedback] = useState("");
  const [internetCoachingTip, setInternetCoachingTip] = useState("");
  const [internetScore, setInternetScore] = useState(0);

  const [loginResponse, setLoginResponse] = useState("");
  const [loginFeedback, setLoginFeedback] = useState("");
  const [loginCoachingTip, setLoginCoachingTip] = useState("");
  const [loginScore, setLoginScore] = useState(0);

  const [slowResponse, setSlowResponse] = useState("");
  const [slowFeedback, setSlowFeedback] = useState("");
  const [slowCoachingTip, setSlowCoachingTip] = useState("");
  const [slowScore, setSlowScore] = useState(0);

  const questions = [
    {
      question:
        "Client: “My internet is very slow and I can’t work.” What do you do FIRST?",
      options: [
        "Ignore the issue",
        "Acknowledge the problem and start troubleshooting",
        "Tell them to buy new equipment",
      ],
      answer: 1,
    },
    {
      question:
        "Client: “I forgot my password and now my account is locked.” What do you do NEXT?",
      options: [
        "Tell them to create a new account",
        "Guide them through password reset and account unlock steps",
        "Tell them to try again later",
      ],
      answer: 1,
    },
    {
      question:
        "Client is still having connection issues after restarting. What do you do NEXT?",
      options: [
        "Tell them the internet is bad",
        "Check if other devices are affected and continue troubleshooting",
        "End the conversation",
      ],
      answer: 1,
    },
  ];

  useEffect(() => {
    setStep(Number(localStorage.getItem("advancedClientSupportStep") || 1));

    setInternetResponse(
      localStorage.getItem("advancedClientSupportInternetResponse") || ""
    );
    setInternetScore(
      Number(localStorage.getItem("advancedClientSupportInternetScore") || 0)
    );

    setLoginResponse(
      localStorage.getItem("advancedClientSupportLoginResponse") || ""
    );
    setLoginScore(
      Number(localStorage.getItem("advancedClientSupportLoginScore") || 0)
    );

    setSlowResponse(
      localStorage.getItem("advancedClientSupportSlowResponse") || ""
    );
    setSlowScore(
      Number(localStorage.getItem("advancedClientSupportSlowScore") || 0)
    );
  }, []);

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    localStorage.setItem("advancedClientSupportStep", String(nextStep));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const evaluateInternet = (value: string): ScenarioResult => {
    const hasEmpathy =
      value.includes("understand") ||
      value.includes("sorry") ||
      value.includes("no problem");

    const hasAction =
      value.includes("check") ||
      value.includes("help") ||
      value.includes("look into");

    const hasTechnical =
      value.includes("wifi") ||
      value.includes("wi-fi") ||
      value.includes("connection") ||
      value.includes("router");

    let score = 0;
    if (hasEmpathy) score += 2;
    if (hasAction) score += 2;
    if (hasTechnical) score += 2;

    if (score === 6) {
      return {
        score,
        feedback: "✅ Excellent — professional and complete response.",
        coachingTip:
          "This works because it shows empathy, offers help, and mentions the Wi-Fi or connection issue clearly.",
      };
    }

    if (score >= 4) {
      return {
        score,
        feedback: "⚠️ Good — add more technical detail.",
        coachingTip:
          "Better response: “I understand. Let me help you check your Wi-Fi connection step by step.”",
      };
    }

    if (value.length < 10) {
      return {
        score,
        feedback: "❌ Too short — add more detail.",
        coachingTip:
          "Try adding empathy and an action step, like: “I understand. Let me check your connection.”",
      };
    }

    return {
      score,
      feedback: "⚠️ Needs improvement — include empathy and clear steps.",
      coachingTip:
        "Better response: “I understand. Let me help you check the Wi-Fi connection and restart the router if needed.”",
    };
  };

  const evaluateLogin = (value: string): ScenarioResult => {
    const hasEmpathy =
      value.includes("understand") ||
      value.includes("sorry") ||
      value.includes("no problem");

    const hasAction =
      value.includes("reset") ||
      value.includes("unlock") ||
      value.includes("help");

    const hasTechnical =
      value.includes("password") ||
      value.includes("account") ||
      value.includes("login") ||
      value.includes("locked");

    let score = 0;
    if (hasEmpathy) score += 2;
    if (hasAction) score += 2;
    if (hasTechnical) score += 2;

    if (score === 6) {
      return {
        score,
        feedback:
          "✅ Excellent — professional and complete login support response.",
        coachingTip:
          "This works because it shows empathy, explains the action, and clearly mentions the account or password issue.",
      };
    }

    if (score >= 4) {
      return {
        score,
        feedback: "⚠️ Good — add more login/account detail.",
        coachingTip:
          "Better response: “I understand. Let me help you reset your password and unlock your account.”",
      };
    }

    if (value.length < 10) {
      return {
        score,
        feedback: "❌ Too short — add more detail.",
        coachingTip:
          "Try: “I understand. Let me help you reset your password.”",
      };
    }

    return {
      score,
      feedback:
        "⚠️ Needs improvement — include empathy and login support steps.",
      coachingTip:
        "Better response: “I understand. Let me help you reset your password and unlock your account so you can log in again.”",
    };
  };

  const evaluateSlow = (value: string): ScenarioResult => {
    const hasEmpathy =
      value.includes("understand") ||
      value.includes("sorry") ||
      value.includes("no problem");

    const hasAction =
      value.includes("check") ||
      value.includes("close") ||
      value.includes("restart") ||
      value.includes("help");

    const hasTechnical =
      value.includes("apps") ||
      value.includes("programs") ||
      value.includes("system") ||
      value.includes("performance");

    let score = 0;
    if (hasEmpathy) score += 2;
    if (hasAction) score += 2;
    if (hasTechnical) score += 2;

    if (score === 6) {
      return {
        score,
        feedback: "✅ Excellent — clear and professional troubleshooting.",
        coachingTip:
          "This works because it shows empathy, suggests action, and references system performance.",
      };
    }

    if (score >= 4) {
      return {
        score,
        feedback: "⚠️ Good — add more technical detail.",
        coachingTip:
          "Better: “I understand. Let’s check your system performance and close any unused programs.”",
      };
    }

    if (value.length < 10) {
      return {
        score,
        feedback: "❌ Too short — add more detail.",
        coachingTip:
          "Try: “I understand. Let me help you check what’s slowing your system.”",
      };
    }

    return {
      score,
      feedback: "⚠️ Needs improvement — include empathy and steps.",
      coachingTip:
        "Better: “I understand. Let’s check your system and close unnecessary apps to improve performance.”",
    };
  };

  const allAnswered =
    selectedAnswers.length === questions.length &&
    selectedAnswers.every((answer) => answer !== undefined);

  const quizScore = questions.filter(
    (q, index) => selectedAnswers[index] === q.answer
  ).length;

  const practicePassed =
    internetScore >= 4 && loginScore >= 4 && slowScore >= 4;

  const quizPassed = quizScore >= 2;
  const passed = practicePassed && quizPassed;

  const saveCompletion = () => {
    const completed = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    );

    if (!completed.includes("Advanced Client Support")) {
      completed.push("Advanced Client Support");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Advanced Client Support
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Complete each support scenario before moving to the CGA quiz.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-8">
          <p className="text-sm text-gray-400 mb-3">Training Progress</p>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <ProgressBox active={step === 1} complete={internetScore >= 4} label="Internet" />
            <ProgressBox active={step === 2} complete={loginScore >= 4} label="Login" />
            <ProgressBox active={step === 3} complete={slowScore >= 4} label="Slow PC" />
            <ProgressBox active={step === 4} complete={passed} label="CGA" />
          </div>
        </div>

        {step === 1 && (
          <>
            <ScenarioBlock
              title="Step 1 — Internet Issue"
              scenario="“My internet is really slow today. I keep getting disconnected, and I can’t finish my work.”"
              goal="Your job is to calm the client, ask clear questions, and guide them through basic troubleshooting."
              suggested="“I understand. Let me help you check the connection step by step. Are you using Wi-Fi or Ethernet right now?”"
              prompt="“My Wi-Fi keeps disconnecting during video calls.”"
              value={internetResponse}
              feedback={internetFeedback}
              coachingTip={internetCoachingTip}
              score={internetScore}
              onChange={(value) => {
                setInternetResponse(value);
                localStorage.setItem(
                  "advancedClientSupportInternetResponse",
                  value
                );

                const result = evaluateInternet(value);
                setInternetFeedback(result.feedback);
                setInternetCoachingTip(result.coachingTip);
                setInternetScore(result.score);
                localStorage.setItem(
                  "advancedClientSupportInternetScore",
                  String(result.score)
                );
              }}
            />

            <NextButton
              disabled={internetScore < 4}
              label="Continue to Login Scenario →"
              onClick={() => goToStep(2)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <ScenarioBlock
              title="Step 2 — Login Issue"
              scenario="“I forgot my password and now my account is locked. I can’t log in.”"
              goal="Your job is to guide them step-by-step and stay professional."
              suggested="“No problem, I can help with that. Let’s reset your password and unlock your account.”"
              prompt="“I tried too many times and now it says my account is locked.”"
              value={loginResponse}
              feedback={loginFeedback}
              coachingTip={loginCoachingTip}
              score={loginScore}
              onChange={(value) => {
                setLoginResponse(value);
                localStorage.setItem("advancedClientSupportLoginResponse", value);

                const result = evaluateLogin(value);
                setLoginFeedback(result.feedback);
                setLoginCoachingTip(result.coachingTip);
                setLoginScore(result.score);
                localStorage.setItem(
                  "advancedClientSupportLoginScore",
                  String(result.score)
                );
              }}
            />

            <div className="flex gap-4">
              <BackButton onClick={() => goToStep(1)} />
              <NextButton
                disabled={loginScore < 4}
                label="Continue to Slow Computer Scenario →"
                onClick={() => goToStep(3)}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <ScenarioBlock
              title="Step 3 — Slow Computer"
              scenario="“My computer is extremely slow. Everything takes forever to load.”"
              goal="Your job is to identify possible causes and guide them through simple steps."
              suggested="“I understand. Let’s check what might be slowing your system down. Can you close unused apps and restart your computer?”"
              prompt="“My laptop is very slow when I open programs.”"
              value={slowResponse}
              feedback={slowFeedback}
              coachingTip={slowCoachingTip}
              score={slowScore}
              onChange={(value) => {
                setSlowResponse(value);
                localStorage.setItem("advancedClientSupportSlowResponse", value);

                const result = evaluateSlow(value);
                setSlowFeedback(result.feedback);
                setSlowCoachingTip(result.coachingTip);
                setSlowScore(result.score);
                localStorage.setItem(
                  "advancedClientSupportSlowScore",
                  String(result.score)
                );
              }}
            />

            <div className="flex gap-4">
              <BackButton onClick={() => goToStep(2)} />
              <NextButton
                disabled={slowScore < 4}
                label="Unlock CGA Quiz →"
                onClick={() => goToStep(4)}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <section className="bg-gray-900 rounded-xl p-6 mt-10">
              <h2 className="text-2xl font-semibold mb-2">CGA Quiz</h2>

              <p className="text-sm text-gray-400 mb-6">
                Answer all questions before submitting. You need 2 out of 3
                correct.
              </p>

              <div className="space-y-8">
                {questions.map((q, questionIndex) => {
                  if (
                    selectedAnswers[questionIndex - 1] === undefined &&
                    questionIndex !== 0
                  ) {
                    return null;
                  }

                  return (
                    <div key={questionIndex}>
                      <p className="text-gray-200 font-medium mb-3">
                        {questionIndex + 1}. {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => {
                              const updatedAnswers = [...selectedAnswers];
                              updatedAnswers[questionIndex] = optionIndex;
                              setSelectedAnswers(updatedAnswers);
                            }}
                            className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                              showScore
                                ? optionIndex === q.answer
                                  ? "bg-green-500 text-black"
                                  : selectedAnswers[questionIndex] === optionIndex
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-800 text-white"
                                : selectedAnswers[questionIndex] === optionIndex
                                ? "bg-green-500 text-black"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {showScore && (
                        <p className="mt-2 text-sm text-gray-400">
                          Correct answer:{" "}
                          <span className="text-green-400">
                            {q.options[q.answer]}
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setShowScore(true);

                  if (passed) {
                    saveCompletion();
                  }
                }}
                disabled={!allAnswered}
                className={`mt-8 px-6 py-3 font-semibold rounded-lg transition ${
                  allAnswered
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit CGA
              </button>

              {showScore && (
                <div className="mt-6">
                  {passed ? (
                    <p className="text-green-400 font-semibold text-lg mb-2">
                      Assignment Complete ✅
                    </p>
                  ) : (
                    <div className="text-red-400 font-semibold text-lg mb-2">
                      <p>Not Passed ❌ — Review what is missing:</p>

                      <ul className="mt-3 list-disc list-inside text-sm text-red-300 space-y-1">
                        {quizScore < 2 && (
                          <li>CGA quiz needs at least 2 / 3 correct.</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <p className="text-lg text-white">
                    CGA Score: {quizScore}/{questions.length}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedAnswers([]);
                      setShowScore(false);
                    }}
                    className="mt-4 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                  >
                    Retry CGA
                  </button>
                </div>
              )}
            </section>

            <div className="flex gap-4 mt-8">
              <BackButton onClick={() => goToStep(3)} />
            </div>
          </>
        )}

        <div className="flex gap-4 mt-10">
          <a
            href="/lessons"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back to Lessons
          </a>

          <a
            href="/vocabulary"
            className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
          >
            Practice Vocabulary
          </a>

          {showScore && passed && (
            <button
              onClick={() => router.push("/lessons")}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
            >
              Finish Level →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function ProgressBox({
  active,
  complete,
  label,
}: {
  active: boolean;
  complete: boolean;
  label: string;
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        active
          ? "bg-green-500 text-black"
          : complete
          ? "bg-green-900 text-green-300"
          : "bg-gray-800 text-gray-400"
      }`}
    >
      {complete ? "✅ " : ""}
      {label}
    </div>
  );
}

function NextButton({
  disabled,
  label,
  onClick,
}: {
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition ${
        disabled
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-green-500 text-black hover:bg-green-400"
      }`}
    >
      {label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      ← Back
    </button>
  );
}

function ScenarioBlock({
  title,
  scenario,
  goal,
  suggested,
  prompt,
  value,
  feedback,
  coachingTip,
  score,
  onChange,
}: {
  title: string;
  scenario: string;
  goal: string;
  suggested: string;
  prompt: string;
  value: string;
  feedback: string;
  coachingTip: string;
  score: number;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <section className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-300">A client says:</p>
        <p className="text-gray-400 mt-3 italic">{scenario}</p>
        <p className="text-gray-300 mt-4">{goal}</p>
      </section>

      <section className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Suggested Response</h2>
        <p className="text-gray-300">{suggested}</p>
      </section>

      <section className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Practice Prompt</h2>
        <p className="text-gray-300">Try responding to this client:</p>
        <p className="text-gray-400 mt-3 italic">{prompt}</p>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          placeholder="Type what you would say to the client..."
          className="mt-5 w-full min-h-32 rounded-lg bg-gray-800 text-white p-4 outline-none focus:ring-2 focus:ring-green-500"
        />

        {value.length > 0 && (
          <p className="mt-3 text-sm text-green-400">
            Response saved locally for this practice.
          </p>
        )}

        {feedback && (
          <p className="mt-2 text-sm text-yellow-400">{feedback}</p>
        )}

        {coachingTip && (
          <div className="mt-3 rounded-lg bg-gray-800 p-4 text-sm text-gray-300">
            <p className="font-semibold text-green-400 mb-1">Coaching Tip</p>
            <p>{coachingTip}</p>
          </div>
        )}

        {score > 0 && (
          <p className="text-sm text-green-400 mt-1">Score: {score} / 6</p>
        )}
      </section>
    </>
  );
}