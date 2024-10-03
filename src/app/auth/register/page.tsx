import RegistrationForm from "@/app/components/RegistrationForm";
import '@/app/styles/login.scss';


export default function HomePage() {
  return (
    <div className="auth_container">
      <h1 className="header">Реєстрація</h1>
      <RegistrationForm />
    </div>
  );
}