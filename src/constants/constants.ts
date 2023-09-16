export const isProd = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return false;
  }

  return true;
};

const shared = {
  avatarPlaceholder: (seed: string | number) => {
    return `https://api.dicebear.com/6.x/micah/svg?seed=${seed}`;
  },
  supabaseUrl: "https://rzhdtbvokroydpbxjopi.supabase.co/",
  // This is a public key, DON'T FREAK OUT, its all good
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aGR0YnZva3JveWRwYnhqb3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NDA5MDQsImV4cCI6MjAxMDQxNjkwNH0.lDys7vQNAq5qdtxLZSxwLvERThmERTkQbuAISRC2l3Q",
};

const devConstants = {
  serverURL: "",
};

const prodConstants = {
  serverURL: "",
};

const constants = isProd() ? prodConstants : devConstants;

export default { ...shared, ...constants };
