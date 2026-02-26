import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMailbox } from "../../services/mailboxService";

const MailboxForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner: "",
    size: "Small",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (evt) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");

    const owner = formData.owner.trim();

    if (!owner) {
      setError("Owner is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await createMailbox({ owner, size: formData.size });
      navigate("/mailboxes");
    } catch (err) {
      setError(err.message || "Failed to create mailbox");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>New Mailbox</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Box Owner:
          <input name="owner" value={formData.owner} onChange={handleChange} />
        </label>

        <label>
          Select Size:
          <select name="size" value={formData.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Big">Big</option>
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Submit"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </main>
  );
};

export default MailboxForm;