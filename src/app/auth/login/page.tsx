import LoginForm from "@/app/components/LoginForm";
import '@/app/styles/login.scss';

export default function LoginPage() {
  return (
    <div className="auth_container">
      <h1 className="header">Вхід</h1>
      <LoginForm />
    </div>
  );
}