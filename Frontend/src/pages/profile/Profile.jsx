import { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    age: 30,
    gender: "MALE",
    phoneNumber: "+91-9876543210",
    address: "123 Main Street, Mumbai",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (dummy)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">My Profile</h2>

      <input
        type="number"
        className="w-full p-2 border border-[var(--color-border)]"
        value={profile.age}
        onChange={(e) =>
          setProfile({ ...profile, age: e.target.value })
        }
      />

      <select
        className="w-full p-2 border border-[var(--color-border)]"
        value={profile.gender}
        onChange={(e) =>
          setProfile({ ...profile, gender: e.target.value })
        }
      >
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
        <option value="OTHER">OTHER</option>
      </select>

      <input
        className="w-full p-2 border border-[var(--color-border)]"
        value={profile.phoneNumber}
        onChange={(e) =>
          setProfile({ ...profile, phoneNumber: e.target.value })
        }
      />

      <textarea
        className="w-full p-2 border border-[var(--color-border)]"
        value={profile.address}
        onChange={(e) =>
          setProfile({ ...profile, address: e.target.value })
        }
      />

      <button className="px-4 py-2 bg-black text-white">
        Update Profile
      </button>
    </form>
  );
}