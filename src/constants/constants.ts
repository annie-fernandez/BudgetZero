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
  supabaseUrl: "https://qexdvsnswodbwjzcxouw.supabase.co",
  // This is a public key, DON'T FREAK OUT, its all good
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleGR2c25zd29kYndqemN4b3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2OTc5NzIsImV4cCI6MjAwNzI3Mzk3Mn0.eOumkx4UCJgWmzRJFJymYTQukJf46aj-kKSiEsuP0So",
};

const devConstants = {
  serverURL: "",
};

const prodConstants = {
  serverURL: "",
};

const constants = isProd() ? prodConstants : devConstants;

export default { ...shared, ...constants };
