type CookieBannerProps = {
  onClose: () => void;
};

function CookieBanner({ onClose }: CookieBannerProps) {
  return (
    <div className="cookie-banner" role="region" aria-label="cookieInfo">
      <p>
        Vi använder en nödvändig HttpOnly cookie för att hantera din inloggning
        och ge en säker autentiserad åtkomst till shoppen. Cookien används
        enbart för autentisering och kräver därav inget samtycke.
      </p>

      <button
        className="primary-button"
        type="button"
        onClick={onClose}
        aria-label="stäng cookieInfo"
      >
        Stäng
      </button>
    </div>
  );
}

export default CookieBanner;
