import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMailboxById } from "../../services/mailboxService";

const MailboxDetails = () => {
  const { mailboxId } = useParams();

  const [mailbox, setMailbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMailbox() {
      try {
        const data = await getMailboxById(mailboxId);
        setMailbox(data);
      } catch (err) {
        setError("Something went wrong while fetching mailbox details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMailbox();
  }, [mailboxId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!mailbox) return <p>Mailbox not found.</p>;

  return (
    <main>
      <h1>Mailbox Details</h1>

      <p>Mailbox ID: {mailbox._id}</p>
      <p>Owner: {mailbox.owner}</p>
      <p>Size: {mailbox.size}</p>

      <Link to="/mailboxes">← Back to Mailboxes</Link>
    </main>
  );
};

export default MailboxDetails;