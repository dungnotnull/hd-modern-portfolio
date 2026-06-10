import "./styles/ProfileArt.css";

const ProfileArt = () => {
  return (
    <div className="profile-art" aria-label="Profile artistic section">
      {/* Deep background glow */}
      <div className="profile-art__glow profile-art__glow--left" />
      <div className="profile-art__glow profile-art__glow--right" />

      {/* Layer 0 — farthest, very faded text strip */}
      <div className="profile-art__layer profile-art__layer--0">
        <span className="profile-art__text profile-art__text--0">
          ENGINEERING
        </span>
      </div>

      {/* Layer 1 — far background text */}
      <div className="profile-art__layer profile-art__layer--1">
        <span className="profile-art__text profile-art__text--1">
          CRITICAL&nbsp;THINKER
        </span>
      </div>

      {/* Layer 2 — mid-background orbital ring */}
      <div className="profile-art__layer profile-art__layer--2">
        <div className="profile-art__orbit-ring" />
      </div>

      {/* Layer 3 — avatar (centre) */}
      <div className="profile-art__layer profile-art__layer--3">
        <div className="profile-art__avatar-wrap">
          <div className="profile-art__avatar-ring profile-art__avatar-ring--outer" />
          <div className="profile-art__avatar-ring profile-art__avatar-ring--inner" />
          <div className="profile-art__avatar">
            <img src="/images/ava.jpg" alt="Hoang Dung" loading="lazy" />
          </div>
          {/* Floating badge */}
          <div className="profile-art__badge profile-art__badge--tl">AI</div>
          <div className="profile-art__badge profile-art__badge--br">DEV</div>
        </div>
      </div>

      {/* Layer 4 — foreground text */}
      <div className="profile-art__layer profile-art__layer--4">
        <span className="profile-art__text profile-art__text--4">
          SOLUTION&nbsp;FOCUS
        </span>
      </div>

      {/* Layer 5 — closest, decorative line + label */}
      {/* <div className="profile-art__layer profile-art__layer--5">
        <div className="profile-art__tag">
          <span className="profile-art__tag-dot" />
          <span className="profile-art__tag-label">Hoang Dung · Vietnam</span>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileArt;
