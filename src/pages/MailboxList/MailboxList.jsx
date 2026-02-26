import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMailboxes } from "../../services/mailboxService";

const MailboxList = () => {
  const [mailboxes, setMailboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMailboxes() {
      try {
        const data = await getMailboxes();
        setMailboxes(data);
      } catch (err) {
        setError("Something went wrong while fetching mailboxes.");
      } finally {
        setLoading(false);
      }
    }

    fetchMailboxes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mailbox List</h1>
      <ul>
        {mailboxes.map((mailbox) => (
          <li key={mailbox._id}>
            <Link to={`/mailboxes/${mailbox._id}`}>
              Mailbox {mailbox._id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MailboxList;
