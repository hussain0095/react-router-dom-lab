const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getMailboxes() {
  const res = await fetch(`${BASE_URL}/mailboxes`);
  if (!res.ok) throw new Error("Failed to fetch mailboxes");
  return res.json();
}

export async function getMailboxById(mailboxId) {
  const res = await fetch(`${BASE_URL}/mailboxes/${mailboxId}`);
  if (!res.ok) throw new Error("Failed to fetch mailbox");
  return res.json();
}

export async function createMailbox({ owner, size }) {
  const res = await fetch(`${BASE_URL}/mailboxes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner, size }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to create mailbox");
  }

  return data;
}