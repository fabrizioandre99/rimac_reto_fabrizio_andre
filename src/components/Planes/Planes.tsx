import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Planes.scss";

// Importación de imágenes como variables
import ICON_VOLVER from "../../assets/images/icon-volver.svg";
import ICON_PARAMI from "../../assets/images/icon-parami.svg";
import ICON_PARAALGUIENMAS from "../../assets/images/icon-paraalquienmas.svg";
import ICON_CHECK from "../../assets/images/icon-check.svg";

interface Plan {
    name: string;
    price: number;
    description: string[];
    age: number;
}

interface User {
    name: string;
    lastName: string;
    birthDay: string;
}

const Planes: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedOption, setSelectedOption] = useState<"paraMi" | "paraAlguienMas" | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isResumen, setIsResumen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get<{ list: Plan[] }>(
                    "https://rimac-front-end-challenge.netlify.app/api/plans.json"
                );
                setPlans(response.data.list);
            } catch (error) {
                console.error("Error fetching the plans:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(
                    "https://rimac-front-end-challenge.netlify.app/api/user.json"
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching the user:", error);
            }
        };

        fetchUser();
        fetchPlans();
    }, []);

    const getUserAge = (birthDay: string): number => {
        const [day, month, year] = birthDay.split("-").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getFilteredPlans = (): Plan[] => {
        if (!user || !selectedOption) return [];
        const userAge = getUserAge(user.birthDay);
        let filteredPlans = plans.filter((plan) => userAge <= plan.age);
        if (selectedOption === "paraAlguienMas") {
            filteredPlans = filteredPlans.map((plan) => ({
                ...plan,
                price: parseFloat((plan.price * 0.95).toFixed(2)),
            }));
        }
        return filteredPlans;
    };

    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsResumen(true);
    };

    const handleBack = () => {
        if (isResumen) {
            setIsResumen(false);
        } else {
            setSelectedOption(null);
        }
    };

    const handleNextPlan = () => {
        if (currentPlanIndex < getFilteredPlans().length - 1) {
            setCurrentPlanIndex(currentPlanIndex + 1);
        }
    };

    const handlePreviousPlan = () => {
        if (currentPlanIndex > 0) {
            setCurrentPlanIndex(currentPlanIndex - 1);
        }
    };

    return (
        <div>
            {isMobile ? (
                <div className="flex items-center w-full py-2 px-4 bg-[#EDEFFC] mb-8">
                    <button className="flex items-center justify-center text-blue-600 mr-4" onClick={handleBack}>
                        <img src={ICON_VOLVER} alt="Volver" className="w-6 h-6" />
                    </button>
                    <span className="text-black font-semibold">PASO {isResumen ? 2 : 1} DE 2</span>
                    <div className="flex-grow mx-4 h-2 bg-[#E0E5FF] rounded-full relative">
                        <div
                            className="absolute top-0 left-0 h-2 bg-[#4F4FFF] rounded-full"
                            style={{ width: isResumen ? "50%" : "25%" }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full py-4 bg-[#EDEFFC] mb-8">
                    <div className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-8 h-8 ${isResumen ? "bg-white text-[#4F4FFF]" : "bg-[#4F4FFF] text-white"
                                } rounded-full border-2 border-[#4F4FFF]`}
                        >
                            1
                        </div>
                        <span className={`ml-2 font-semibold ${isResumen ? "text-[#A3A3FF]" : "text-black"}`}>
                            Planes y coberturas
                        </span>
                    </div>
                    <div className="mx-4 w-8 border-t-2 border-dotted border-[#4F4FFF]"></div>
                    <div className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-8 h-8 ${isResumen ? "bg-[#4F4FFF] text-white" : "bg-white text-[#4F4FFF]"
                                } rounded-full border-2 border-[#4F4FFF]`}
                        >
                            2
                        </div>
                        <span className="ml-2 text-[#A3A3FF]">Resumen</span>
                    </div>
                </div>
            )}

            {isResumen && selectedPlan && (
                <div className="container max-w-7xl mx-auto px-6 md:px-12 mt-8">
                    <nav className="flex items-center justify-between mb-4">
                        <button className="text-blue-600 flex items-center" onClick={handleBack}>
                            <img src={ICON_VOLVER} alt="Volver" className="w-6 h-6 mr-2" />
                            Volver
                        </button>
                    </nav>
                    <h1 className="text-4xl font-bold text-black mb-4">Resumen del seguro</h1>
                    <div className="shadow-card p-4 rounded-lg shadow-md mt-4 bg-white border-b-2 border-[#D7DBF5]">
                        <p className="text-sm font-semibold">Precios calculados para:</p>
                        <p className="text-2xl font-bold mb-4">{user ? `${user.name} ${user.lastName}` : "Usuario"}</p>
                        <p className="font-semibold">Plan elegido:</p>
                        <p className="text-normal">{selectedPlan.name}</p>
                        <p className="text-normal">Costo del Plan: S/ {selectedPlan.price} al mes</p>
                    </div>
                </div>
            )}

            {!isResumen && (
                <div className="container max-w-4xl mx-auto px-6 relative z-10 pb-14">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-black pt-4">
                            {user ? `${user.name}, ¿Para quién deseas` : "¿Para quién deseas"}
                            <br />
                            cotizar?
                        </h1>
                        <p className="text-gray-500 mb-8 text-black">
                            Selecciona la opción que se ajuste más a tus necesidades.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 md:mx-[180px]">
                        <div
                            className={`bg-white p-6 rounded-lg cursor-pointer transition duration-300 relative min-h-[150px] ${selectedOption === "paraMi" ? "border-black border-4" : ""
                                } shadow-card flex flex-col justify-between h-full`}
                            onClick={() => setSelectedOption("paraMi")}
                        >
                            <div>
                                <div className="flex items-start mb-2">
                                    <img src={ICON_PARAMI} alt="Icon Para Mi" className="w-10 h-10 mr-2" />
                                </div>
                                <h2 className="text-xl font-semibold">Para mí</h2>
                                <p className="text-sm text-gray-500">
                                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                                </p>
                            </div>
                            <div className={`absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full ${selectedOption === "paraMi" ? "bg-green-500" : "border-2 border-[#A9AFD9] bg-white"}`}>
                                {selectedOption === "paraMi" && <img src={ICON_CHECK} alt="Check icon" className="w-4 h-4" />}
                            </div>
                        </div>
                        <div
                            className={`bg-white p-6 rounded-lg cursor-pointer transition duration-300 relative min-h-[150px] ${selectedOption === "paraAlguienMas" ? "border-black border-4" : ""
                                } shadow-card flex flex-col justify-between h-full`}
                            onClick={() => setSelectedOption("paraAlguienMas")}
                        >
                            <div>
                                <div className="flex items-start mb-2">
                                    <img src={ICON_PARAALGUIENMAS} alt="Icon Para Alguien Mas" className="w-10 h-10 mr-2" />
                                </div>
                                <h2 className="text-xl font-semibold">Para alguien más</h2>
                                <p className="text-sm text-gray-500">
                                    Realiza una cotización para uno de tus familiares o cualquier persona.
                                </p>
                            </div>
                            <div className={`absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full ${selectedOption === "paraAlguienMas" ? "bg-green-500" : "border-2 border-[#A9AFD9] bg-white"}`}>
                                {selectedOption === "paraAlguienMas" && <img src={ICON_CHECK} alt="Check icon" className="w-4 h-4" />}
                            </div>
                        </div>
                    </div>

                    {isMobile ? (
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-300"
                                    style={{ transform: `translateX(-${currentPlanIndex * 100}%)` }}
                                >
                                    {getFilteredPlans().map((plan, index) => (
                                        <div key={index} className="min-w-full p-4">
                                            {/* Card del plan móvil */}
                                            <div className="rounded-lg shadow-card flex flex-col justify-between h-full bg-white p-6">
                                                <div className="mb-2">
                                                    {plan.name === "Plan en Casa y Clínica" && (
                                                        <span
                                                            style={{
                                                                fontWeight: 700,
                                                                display: "inline-block",
                                                                padding: "7px 6px 5px 6px",
                                                                borderRadius: "4px",
                                                                fontSize: "14px",
                                                                lineHeight: "16px",
                                                                letterSpacing: ".4px",
                                                                background: "#7DF0BA",
                                                            }}
                                                            className="mb-2"
                                                        >
                                                            Plan recomendado
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-semibold flex justify-between items-center">
                                                    {plan.name}
                                                    <img
                                                        src={`../../assets/images/icon-${plan.name.replace(/\s+/g, '').toLowerCase()}.svg`}
                                                        alt={`${plan.name} icon`}
                                                        className="w-6 h-6"
                                                    />
                                                </h3>
                                                <p className="text-xs uppercase text-gray-500">Costo del Plan</p>
                                                {selectedOption === "paraAlguienMas" && (
                                                    <p className="text-sm text-gray-400 line-through">{`$${plan.price} antes`}</p>
                                                )}
                                                <p className="text-2xl font-bold mb-4">{`$${selectedOption === "paraAlguienMas" ? (plan.price * 0.95).toFixed(2) : plan.price} al mes`}</p>
                                                <ul className="flex flex-col gap-2 mb-4 mt-2">
                                                    {plan.description.map((item, idx) => (
                                                        <li key={idx} className="text-sm text-gray-700 leading-6 mb-2 before:content-['•'] before:mr-2 before:text-black before:font-bold">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    className="bg-[#FF1C44] text-white py-2 px-4 rounded-full w-full hover:bg-red-600 transition duration-300 mt-4"
                                                    onClick={() => handlePlanSelect(plan)}
                                                >
                                                    Seleccionar Plan
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Paginación en modo móvil */}
                            <div className="flex justify-center mt-4">
                                <button onClick={handlePreviousPlan} disabled={currentPlanIndex === 0}>
                                    {"<"}
                                </button>
                                <span className="mx-2">{currentPlanIndex + 1} / {getFilteredPlans().length}</span>
                                <button onClick={handleNextPlan} disabled={currentPlanIndex === getFilteredPlans().length - 1}>
                                    {">"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Cards para escritorio */}
                            {getFilteredPlans().map((plan, index) => (
                                <div key={index} className="rounded-lg shadow-card flex flex-col justify-between h-full bg-white p-6">
                                    <div className="mb-2">
                                        {plan.name === "Plan en Casa y Clínica" && (
                                            <span
                                                style={{
                                                    fontWeight: 700,
                                                    display: "inline-block",
                                                    padding: "7px 6px 5px 6px",
                                                    borderRadius: "4px",
                                                    fontSize: "14px",
                                                    lineHeight: "16px",
                                                    letterSpacing: ".4px",
                                                    background: "#7DF0BA",
                                                }}
                                                className="mb-2"
                                            >
                                                Plan recomendado
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold flex justify-between items-center">
                                        {plan.name}
                                        <img
                                            src={`../../assets/images/icon-${plan.name.replace(/\s+/g, '').toLowerCase()}.svg`}
                                            alt={`${plan.name} icon`}
                                            className="w-6 h-6"
                                        />
                                    </h3>
                                    <p className="text-xs uppercase text-gray-500">Costo del Plan</p>
                                    {selectedOption === "paraAlguienMas" && (
                                        <p className="text-sm text-gray-400 line-through">{`$${plan.price} antes`}</p>
                                    )}
                                    <p className="text-2xl font-bold mb-4">{`$${selectedOption === "paraAlguienMas" ? (plan.price * 0.95).toFixed(2) : plan.price} al mes`}</p>
                                    <ul className="flex flex-col gap-2 mb-4 mt-2">
                                        {plan.description.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 leading-6 mb-2 before:content-['•'] before:mr-2 before:text-black before:font-bold">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="bg-[#FF1C44] text-white py-2 px-4 rounded-full w-full hover:bg-red-600 transition duration-300 mt-4"
                                        onClick={() => handlePlanSelect(plan)}
                                    >
                                        Seleccionar Plan
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Planes;
