
// Initialize Supabase Client
// Note: In a production environment with a build step, use environment variables.
// For this static demo, we expose the anon key which is safe for public client-side use 
// as long as RLS policies are enabled (which they are).

const SUPABASE_URL = 'https://wzejeaxkozhfxhiukiui.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZWplYXhrb3poZnhoaXVraXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODY2NDQsImV4cCI6MjA4MzM2MjY0NH0.GEnwKh_WFZuJlCj7Q4DKlgwFaZ_CCDMPgpq2ZOvK6-U';

// Check if supabase-js is loaded (it should be via CDN in HTML)
if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase initialized');
} else {
    console.error('Supabase SDK not loaded. Please include the CDN script tag.');
}

// Helper to check user session
async function checkSession() {
    if (!window.supabaseClient) return null;
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error) {
        console.error('Error checking session:', error);
        return null;
    }
    return session;
}
