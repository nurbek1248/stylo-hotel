import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function BackButton() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span>{t('nav.back')}</span>
    </button>
  );
}
