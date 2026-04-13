import { createPortal } from "react-dom";

const Modal = ({
  ref,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: {
  ref: React.Ref<HTMLDialogElement>;
  title: string;
  description?: string;
  ctaPrimary?: { label: string; onClick?: () => void };
  ctaSecondary?: { label: string; onClick?: () => void };
}) => {
  return createPortal(
    <dialog ref={ref}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <form method="dialog">
        {ctaPrimary && (
          <button onClick={ctaPrimary.onClick}>{ctaPrimary.label}</button>
        )}
        {ctaSecondary && (
          <button onClick={ctaSecondary.onClick}>{ctaSecondary.label}</button>
        )}
      </form>
    </dialog>,
    document.getElementById("project-modal-root") as HTMLElement,
  );
};

export default Modal;
