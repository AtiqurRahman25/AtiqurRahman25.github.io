// Toggle Mobile Drawer Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// Silent Background Visitor Tracker
function trackVisitorSilently() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const visitorData = {
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country_name,
                org: data.org || "Unknown ISP/University Network",
                timestamp: new Date().toISOString(),
                page: window.location.pathname || "Home"
            };

            // Silent log to developer console
            console.log("🔒 Silent Visitor Log captured:", visitorData);

            /*
              To send live notifications to a private Discord/Telegram webhook,
              add a secondary fetch block here:

              fetch('YOUR_DISCORD_WEBHOOK_URL', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  content: `New visitor from ${visitorData.org} (${visitorData.city}, ${visitorData.country})`
                })
              });
            */
        })
        .catch(() => {
            // Fails silently if blocked by ad-blocker or offline
            console.warn("Visitor lookup bypassed silently.");
        });
}

document.addEventListener('DOMContentLoaded', trackVisitorSilently);