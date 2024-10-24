import React, { useState } from "react";
import familyImage from '../../assets/images/img-family.png';
import iconArrow from '../../assets/images/icon-arrow.svg';
import "./Home.scss";

interface FormState {
  documentType: string;
  documentNumber: string;
  phoneNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialCommunications: boolean;
}

const Home: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    documentType: "DNI",
    documentNumber: "",
    phoneNumber: "",
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  });

  const [isValid, setIsValid] = useState({
    documentNumber: true,
    phoneNumber: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const value = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, ''); // Eliminar todo lo que no sea un dígito

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDocumentNumberValid = form.documentNumber.trim() !== "";
    const isPhoneNumberValid = form.phoneNumber.trim() !== "";

    setIsValid({
      documentNumber: isDocumentNumberValid,
      phoneNumber: isPhoneNumberValid,
    });

    if (!isDocumentNumberValid || !isPhoneNumberValid) {
      return;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="home flex justify-center items-center relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="home__content flex flex-col lg:flex-row justify-between items-center lg:items-start lg:px-24">
          <div className="home__image hidden lg:block md:flex-shrink-0">
            <img
              src={familyImage}
              alt="Family"
              className="rounded-lg w-[500px] h-auto "
            />
          </div>
          <div className="home__form-container">
            <div className="home__tag mb-4">
              Seguro Salud Flexible
            </div>
            <h1 className="home__title text-4xl font-bold mb-4 text-black">
              Creado para ti y tu <br /> familia
            </h1>

            <p className="home__description text-black font-semibold mb-6">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y <br /> recibe nuestra asesoría. 100% online.
            </p>
            <form className="home__form" onSubmit={handleSubmit}>
              <div className="home__inputs mb-6">
                <div className="relative mb-4">
                  <label className="absolute top-1 text-black text-sm pointer-events-none ml-[112px]">
                    Nro. de documento
                  </label>

                  <div className={`flex items-center rounded-lg overflow-hidden border ${!isValid.documentNumber ? 'border-red-500 border-2' : 'border-[#5E6488]'}`}>
                    <div className="relative flex items-center">
                      <select
                        name="documentType"
                        value={form.documentType}
                        onChange={handleChange}
                        className="appearance-none border-none focus:outline-none bg-transparent px-3 py-2 text-black cursor-pointer"
                      >
                        <option value="DNI">DNI</option>
                        <option value="CE">CE</option>
                        <option value="Passport">Pasaporte</option>
                      </select>
                      <img
                        src={iconArrow}
                        alt="Dropdown Icon"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                      />
                    </div>
                    <input
                      type="text"
                      name="documentNumber"
                      maxLength={8}
                      value={form.documentNumber}
                      onInput={handleInput}
                      className={`flex-grow px-3 py-2 bg-transparent focus:outline-none text-black pt-6 border-l ${!isValid.documentNumber ? 'border-red-500' : 'border-[#5E6488]'}`}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <label className="absolute left-3 top-1 text-black text-sm pointer-events-none">
                    Celular
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    maxLength={9}
                    value={form.phoneNumber}
                    onInput={handleInput}
                    className={`w-full px-3 py-2 rounded-lg bg-transparent focus:outline-none text-black pt-6 border ${!isValid.phoneNumber ? 'border-red-500 border-2' : 'border-[#5E6488]'}`}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>

              <div className="home__checkboxes mb-6 text-gray-800">
                <label className="flex items-center mb-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptPrivacyPolicy"
                    checked={form.acceptPrivacyPolicy}
                    onChange={handleChange}
                    className="appearance-none h-5 w-5 border border-gray-400 rounded-sm checked:bg-black checked:border-black focus:outline-none mr-2"
                  />
                  <span>Acepto la Política de Privacidad</span>
                </label>

                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptCommercialCommunications"
                    checked={form.acceptCommercialCommunications}
                    onChange={handleChange}
                    className="appearance-none h-5 w-5 border border-gray-400 rounded-sm checked:bg-black checked:border-black focus:outline-none mr-2"
                  />
                  <span>Acepto la Política Comunicaciones Comerciales</span>
                </label>
              </div>

              <p className="home__terms mb-6 text-sm font-bold mb-4 text-black">
                <span className="underline cursor-pointer" onClick={openModal}>
                  Aplican Términos y Condiciones.
                </span>
              </p>
              <button
                type="submit"
                className="home__submit-btn"
              >
                Cotiza aquí
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg p-6 w-4/5 md:w-1/2 max-w-lg relative">
            <h2 className="text-2xl font-bold mb-4">Términos y Condiciones</h2>
            <p className="mb-4">
              Bienvenido a RIMAC Seguros. Estos términos y condiciones rigen el uso de nuestros servicios
              y establecen los derechos y obligaciones entre RIMAC Seguros y sus clientes.
            </p>
            <ul className="list-disc list-inside mb-4 text-sm">
              <li><strong>Cobertura:</strong> Los servicios ofrecidos por RIMAC Seguros cubren los riesgos y beneficios especificados en las pólizas contratadas.</li>
              <li><strong>Uso de datos:</strong> Al proporcionar su información personal, acepta que RIMAC Seguros la use para fines de gestión y mejoramiento del servicio.</li>
              <li><strong>Condiciones de pago:</strong> Las primas deben ser pagadas en las fechas indicadas para mantener la cobertura activa.</li>
              <li><strong>Política de privacidad:</strong> RIMAC Seguros se compromete a proteger la confidencialidad de la información proporcionada por sus clientes.</li>
            </ul>
            <p className="mb-4 text-sm">
              Al utilizar nuestros servicios, acepta estos términos y condiciones. Para más detalles, por favor contacte a nuestro servicio de atención al cliente.
            </p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
