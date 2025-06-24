// src/pages/ProfilePage.tsx

import { UserProfile } from "@clerk/clerk-react";

export default function ManageAccount() {


  return (
    <div className="max-w-xl mx-auto p-6 mt-10  shadow-md rounded-md flex items-center justify-center">
        <UserProfile />
      </div>
  );
}
