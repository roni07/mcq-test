import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {UserInfo} from "./Home";
import {getQuestionByLang, Question} from "../json/Questions";

interface Ans {
    id: number,
    options: string[]
}

const Exam: React.FC = () => {

    const {state} = useLocation();
    const user = state as UserInfo;
    const navigate = useNavigate();

    const [currentQ, setCurrentQ] = useState<number>(0);
    const [ansList, setAnsList] = useState<Ans[]>([]);

    const questionList: Question[] = getQuestionByLang(user.lang);
    const question: Question = questionList[currentQ];

    const handleOptionPick = (option: string, checked?: boolean) => {

        const find = ansList.find(ans => ans.id === question.id);

        if (find) {

            if (question.ans.length > 1) {

                const _ansList = ansList.map((ans) => {

                    if (ans.id === question.id) {

                        if (checked) {
                            ans = {id: question.id, options: [...ans.options, option]};
                        } else {
                            let _options = ans.options.filter(op => op !== option);
                            ans = {id: question.id, options: _options};
                        }
                    }

                    return ans;
                })

                setAnsList(_ansList)

            } else {

                const _ansList = ansList.map((ans) => {

                    if (ans.id === question.id) {
                        ans = {id: question.id, options: [option]};
                    }

                    return ans;
                });

                setAnsList(_ansList)
            }

        } else {
            const _ans = {id: question.id, options: [option]};

            setAnsList([...ansList, _ans])

        }

    }

    const isAns = (option: string) => {

        const ans = ansList.find(ans => ans.id === question.id);

        if (!ans) return false;

        return !!ans.options.find(op => op === option);

    }

    const isQuestionAns = (questionId: number) => {

        const ans = ansList.find(ans => ans.id === questionId);

        if (!ans) return false;

        return ans.options.length > 0;

    }

    const handleResult = () => {

        let count: number = 0;

        ansList.forEach(ans => {

            for (let q of questionList) {
                if (ans.id === q.id) {
                    if (JSON.stringify(ans.options) === JSON.stringify(q.ans)) {
                        count++;
                    }
                    break;
                }
            }

        });

        navigate("/result", {
            state: {ansCount: count, count: questionList.length}
        })

    }

    return (
        <div data-testid="exam">
            <h3>Language: {user.lang}</h3>
            {
                getQuestionByLang(user.lang).map((question, index) => (
                    <span
                        key={index}
                        style={{
                            display: "inline-block",
                            margin: "4px",
                            width: "30px",
                            height: "30px",
                            lineHeight: "30px",
                            borderRadius: "50%",
                            backgroundColor: `${isQuestionAns(question.id) ? "red" : "grey"}`,
                            cursor: "pointer"
                        }}
                        onClick={() => setCurrentQ(index)}
                    >
                        {index + 1}
                    </span>
                ))
            }
            <div>
                <p>{currentQ + 1}. {question.title}</p>
                {
                    question.options.map((option, index) => (
                        <div key={index}>
                            <label key={option}>
                                {index + 1}.
                                {
                                    question.ans.length > 1 ?
                                        <input
                                            type="checkbox"
                                            checked={isAns(option)}
                                            onChange={(e) => handleOptionPick(option, e.target.checked)}
                                        />
                                        : <input
                                            type="radio"
                                            checked={isAns(option)}
                                            name={question.id.toString()}
                                            onChange={() => handleOptionPick(option)}
                                        />
                                } {option}
                            </label>
                        </div>
                    ))
                }
            </div>
            {
                currentQ === (questionList.length - 1) && <button
                    onClick={handleResult}
                >
                    Submit
                </button>
            }
        </div>
    );
};

export default Exam;