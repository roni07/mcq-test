import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export interface UserInfo {
    name: string,
    gender: string,
    lang: string,
}

const Home:React.FC = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState<UserInfo>({
        name: "",
        gender: "Male",
        lang: "Java",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value} = e.target;
        setUser({...user, [name]: value});

    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log(user);
        navigate("/exam", {
            state: user
        });
    }

    return (
        <form
            data-testid="home"
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
            onSubmit={handleSubmit}
        >
            <div style={{
                width: "320px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <input
                    value={user.name}
                    type="text"
                    name="name"
                    placeholder="Please enter your name"
                    onChange={handleInputChange}
                />
                <select
                    name="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select
                    name="lang"
                    value={user.lang}
                    onChange={handleInputChange}
                >
                    <option value="Java">Java</option>
                    <option value="NodeJS">NodeJS</option>
                </select>
                <button
                    type={"submit"}
                    // onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Home;