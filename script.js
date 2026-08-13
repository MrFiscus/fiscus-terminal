document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("terminal-input");
    const outputArea = document.getElementById("output-area");
    const resumePdf = "Smaran-Pokharel-Resume.pdf";
    const taskbarClock = document.getElementById("taskbar-clock");
    const startButton = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");
    const taskbarTray = document.getElementById("taskbar-tray");
    const commandIcons = {
        help: "icon-help",
        about: "icon-about",
        education: "icon-education",
        experience: "icon-experience",
        projects: "icon-projects",
        skills: "icon-skills",
        achievements: "icon-achievements",
        contact: "icon-contact",
        resume: "icon-resume",
    };
    let topWindowZIndex = 30;
    let windowTaskId = 0;

    const welcomeMarkup = `
        <pre class="ascii-banner">███████╗███╗   ███╗ █████╗ ██████╗  █████╗ ███╗   ██╗  ██████╗  ██████╗ ██╗  ██╗██╗  ██╗ █████╗ ██████╗ ███████╗██╗
██╔════╝████╗ ████║██╔══██╗██╔══██╗██╔══██╗████╗  ██║  ██╔══██╗██╔═══██╗██║ ██╔╝██║  ██║██╔══██╗██╔══██╗██╔════╝██║
███████╗██╔████╔██║███████║██████╔╝███████║██╔██╗ ██║  ██████╔╝██║   ██║█████╔╝ ███████║███████║██████╔╝█████╗  ██║
╚════██║██║╚██╔╝██║██╔══██║██╔══██╗██╔══██║██║╚██╗██║  ██╔═══╝ ██║   ██║██╔═██╗ ██╔══██║██╔══██║██╔══██╗██╔══╝  ██║
███████║██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║██║ ╚████║  ██║     ╚██████╔╝██║  ██╗██║  ██║██║  ██║██║  ██║███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝</pre>
        <p class="output"><span class="terminal-arrow">&gt;&gt;</span> Welcome to my <span class="terminal-highlight">portfolio</span> website. Type a command or click one below:</p>
        <p class="output"><span class="command-inline clickable-command" data-command="about">about</span>: Information about me</p>
        <p class="output"><span class="command-inline clickable-command" data-command="education">education</span>: My university, coursework, and academic notes</p>
        <p class="output"><span class="command-inline clickable-command" data-command="experience">experience</span>: Work and leadership experience</p>
        <p class="output"><span class="command-inline clickable-command" data-command="skills">skills</span>: Languages, tools, and frameworks</p>
        <p class="output"><span class="command-inline clickable-command" data-command="projects">projects</span>: Selected technical projects</p>
        <p class="output"><span class="command-inline clickable-command" data-command="contact">contact</span>: My contact information</p>
        <p class="output"><span class="command-inline clickable-command" data-command="resume">resume</span>: View and download my resume</p>
        <p class="output"><span class="command-inline clickable-command" data-command="clear">clear</span>: Clear the terminal</p>
    `;

    const commandPanels = {
        help: {
            title: "Help",
            content: `
                <section class="help-panel">
                    <div class="help-hero">
                        <span class="help-hero-icon icon-help" aria-hidden="true"></span>
                        <div>
                            <p class="popup-kicker">Command Center</p>
                            <h2 class="popup-heading">How do you want to explore?</h2>
                            <p>Click a command tile or type it into the terminal. The desktop icons, Start menu, and terminal all lead to the same portfolio apps.</p>
                        </div>
                    </div>
                    <div class="help-card">
                        <p class="popup-kicker">Navigation</p>
                        <div class="help-command-grid">
                            <button class="help-command" data-command="about" type="button"><span class="icon-about"></span>about</button>
                            <button class="help-command" data-command="education" type="button"><span class="icon-education"></span>education</button>
                            <button class="help-command" data-command="experience" type="button"><span class="icon-experience"></span>experience</button>
                            <button class="help-command" data-command="projects" type="button"><span class="icon-projects"></span>projects</button>
                            <button class="help-command" data-command="skills" type="button"><span class="icon-skills"></span>skills</button>
                            <button class="help-command" data-command="contact" type="button"><span class="icon-contact"></span>contact</button>
                            <button class="help-command" data-command="resume" type="button"><span class="icon-resume"></span>resume</button>
                        </div>
                    </div>
                    <div class="help-card">
                        <p class="popup-kicker">Terminal</p>
                        <div class="help-pill-row">
                            <button data-command="terminal" type="button">terminal</button>
                            <button data-command="clear" type="button">clear</button>
                            <button data-command="help" type="button">help</button>
                            <button type="button" data-copy-command="ls">ls</button>
                            <button type="button" data-copy-command="whoami">whoami</button>
                            <button type="button" data-copy-command="date">date</button>
                        </div>
                    </div>
                    <div class="help-card">
                        <p class="popup-kicker">Easter Eggs</p>
                        <div class="help-pill-row help-easter-row">
                            <button type="button" data-copy-command="sudo">sudo</button>
                            <button type="button" data-copy-command="coffee">coffee</button>
                            <button type="button" data-copy-command="theme">theme</button>
                            <button type="button" data-copy-command="neofetch">neofetch</button>
                            <button type="button" data-copy-command="konami">konami</button>
                        </div>
                    </div>
                    <p class="help-tip">Tip: command tiles open windows. Easter egg pills copy the command into the terminal input so you can press Enter like a proper hacker.</p>
                </section>
            `,
        },
        about: {
            title: "About.txt",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-about" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Profile</p>
                        <h2 class="popup-hero-title">Smaran Pokharel</h2>
                        <p class="popup-hero-text">CS Honors @ DSU | Web Developer | Cyber Security Enthusiast based in Madison, South Dakota.</p>
                    </div>
                </section>
                <section class="about-profile">
                    <div class="about-sidebar">
                        <div class="profile-photo-frame">
                            <img src="image-self.jpg?v=20260429-photo" alt="Smaran Pokharel portrait" class="profile-photo">
                        </div>
                        <div class="about-status">
                            <span>Available for internships</span>
                            <span>Madison, SD</span>
                        </div>
                    </div>
                    <div class="about-main">
                        <div class="about-nameplate">
                            <p class="popup-kicker">Hello there</p>
                            <h3 class="about-title">I build useful web apps, playful interfaces, and technical projects with personality.</h3>
                            <p>I am a Computer Science Honors student at Dakota State University who likes turning rough ideas into things people can actually use. My projects range from terminal learning games and Spotify data apps to movie tools, C++ data-structure assignments, Assembly experiments, and this retro desktop portfolio.</p>
                        </div>
                        <div class="about-fields">
                            <div><span>Current</span><b>CS Honors @ Dakota State University</b></div>
                            <div><span>Focus</span><b>Web development, cybersecurity, and software systems</b></div>
                            <div><span>Also</span><b>Peer tutor, office assistant, club treasurer, event organizer</b></div>
                        </div>
                        <p class="about-note">I care about building software that feels approachable. Whether I am tutoring someone through a concept or shipping a project under a deadline, I try to bring patience, curiosity, and a little bit of style into the work.</p>
                    </div>
                </section>
                <div class="action-row">
                    <button class="win-button" data-command="projects" type="button">Open Projects.exe</button>
                    <button class="win-button" data-command="resume" type="button">Open Resume</button>
                    <button class="win-button" data-command="contact" type="button">Contact Me</button>
                </div>
            `,
        },
        education: {
            title: "Education.doc",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-education" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Education</p>
                        <h2 class="popup-hero-title">Academic Background</h2>
                        <p class="popup-hero-text">Computer Science student at Dakota State University with earlier academic and leadership foundations from Kathmandu Model Secondary School.</p>
                    </div>
                </section>
                <section class="education-stack">
                    <article class="education-card education-card-primary">
                        <div>
                            <p class="education-label">University</p>
                            <h3 class="education-title">Dakota State University</h3>
                            <p class="education-degree">Computer Science Honors</p>
                            <p class="education-copy">Building a strong foundation in software development, cybersecurity, systems thinking, and practical problem solving through coursework, tutoring, campus work, and technical projects.</p>
                        </div>
                        <div class="education-meta">
                            <span>Madison, South Dakota</span>
                            <span>Aug 2024-Feb 2028</span>
                            <span>GPA: 4.0</span>
                        </div>
                    </article>

                    <article class="education-card">
                        <div>
                            <p class="education-label">High School</p>
                            <h3 class="education-title">Kathmandu Model Secondary School</h3>
                            <p class="education-degree">Secondary Studies</p>
                            <p class="education-copy">Developed early technical curiosity through computer club work, coding events, hackathons, student committee involvement, and editorial leadership.</p>
                        </div>
                        <div class="education-meta">
                            <span>Kathmandu, Nepal</span>
                            <span>Aug 2021-Aug 2023</span>
                        </div>
                    </article>
                </section>
                <section class="education-highlights">
                    <article class="popup-card">
                        <h3 class="popup-card-title">Academic Focus</h3>
                        <p class="popup-card-text">Computer science, web development, cybersecurity, object-oriented design, and practical software projects.</p>
                    </article>
                    <article class="popup-card">
                        <h3 class="popup-card-title">Campus Learning</h3>
                        <p class="popup-card-text">Peer tutoring and office assistant work strengthened communication, reliability, support skills, and day-to-day operational discipline.</p>
                    </article>
                    <article class="popup-card">
                        <h3 class="popup-card-title">Early Leadership</h3>
                        <p class="popup-card-text">Computer club, student committee, and editors club roles helped shape event organization, teamwork, and writing skills.</p>
                    </article>
                </section>
            `,
        },
        experience: {
            title: "Experience.log",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-experience" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Experience</p>
                        <h2 class="popup-hero-title">Work + Leadership</h2>
                        <p class="popup-hero-text">Campus operations, peer tutoring, student organization leadership, computer club work, and editorial experience.</p>
                    </div>
                </section>
                <section class="experience-list">
                    <details class="experience-card" open>
                        <summary>
                            <span class="experience-icon icon-experience"></span>
                            <span><b>Office Assistant</b><small>Dakota State University</small></span>
                            <time>Apr 2026-Present</time>
                        </summary>
                        <div class="experience-body">
                            <p>Support daily front-office operations by keeping information accurate, requests moving, and communication clear for students, staff, and campus visitors.</p>
                            <ul>
                                <li>Perform accurate data entry and help maintain key office databases.</li>
                                <li>Assist with work order processing, phone support, campus information, and vehicle reservations.</li>
                                <li>Handle sensitive information with confidentiality, consistency, and attention to detail.</li>
                            </ul>
                        </div>
                    </details>
                    <details class="experience-card">
                        <summary>
                            <span class="experience-icon icon-education"></span>
                            <span><b>Peer Tutor</b><small>Dakota State University</small></span>
                            <time>Aug 2025-Present</time>
                        </summary>
                        <div class="experience-body">
                            <p>Provide one-to-one academic support for students by breaking course material into clearer steps and adapting explanations to different learning styles.</p>
                            <ul>
                                <li>Help peers strengthen understanding of class concepts through guided problem solving.</li>
                                <li>Practice patient technical communication and active listening.</li>
                                <li>Build confidence by helping students move from stuck to self-sufficient.</li>
                            </ul>
                        </div>
                    </details>
                    <details class="experience-card">
                        <summary>
                            <span class="experience-icon icon-contact"></span>
                            <span><b>Treasurer</b><small>DSU International Club</small></span>
                            <time>Aug 2024-Present</time>
                        </summary>
                        <div class="experience-body">
                            <p>Help manage club funds and event budgets for an organization focused on international student community, cultural programming, and campus connection.</p>
                            <ul>
                                <li>Track allocated budgets for events and club activities.</li>
                                <li>Support planning decisions with practical cost awareness.</li>
                                <li>Collaborate with club members to keep events organized and financially realistic.</li>
                            </ul>
                        </div>
                    </details>
                    <details class="experience-card">
                        <summary>
                            <span class="experience-icon icon-projects"></span>
                            <span><b>Executive Member</b><small>KMC Computer Club</small></span>
                            <time>Aug 2021-Aug 2023</time>
                        </summary>
                        <div class="experience-body">
                            <p>Contributed to a student technology community that organized events and programs including FunFest, Code Camp, Hackathon, and student committee initiatives.</p>
                            <ul>
                                <li>Helped coordinate technical and student engagement events.</li>
                                <li>Worked with teammates on planning, logistics, and event execution.</li>
                                <li>Developed early interest in web development, programming, and community learning.</li>
                            </ul>
                        </div>
                    </details>
                    <details class="experience-card">
                        <summary>
                            <span class="experience-icon icon-skills"></span>
                            <span><b>Secretary</b><small>KMCSC Editors Club</small></span>
                            <time>Aug 2021-Aug 2023</time>
                        </summary>
                        <div class="experience-body">
                            <p>Supported article publication and school magazine work while strengthening writing, editing, organization, and communication skills.</p>
                            <ul>
                                <li>Helped prepare written content for publication.</li>
                                <li>Balanced editorial detail with deadlines and coordination.</li>
                                <li>Improved written communication, structure, and review habits.</li>
                            </ul>
                        </div>
                    </details>
                </section>
            `,
        },
        projects: {
            title: "Projects.exe",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-projects" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Featured Projects</p>
                        <h2 class="popup-hero-title">GitHub Project Gallery</h2>
                        <p class="popup-hero-text">Selected work from my GitHub across AI planning, music analysis, movie tools, games, coursework, and portfolio experiments.</p>
                    </div>
                </section>
                <section class="project-list">
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="https://raw.githubusercontent.com/MrFiscus/Fipher-Keys/main/docs/screenshots/dashboard.png" alt="Fipher Keys dashboard screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Facilities Key Management System</p>
                            <h3 class="project-title">Fipher Keys</h3>
                            <p class="project-meta">DSU Facilities Management was running key tracking off a single spreadsheet. Fipher Keys replaces it with a real system: 1,000+ keys, 28+ years of history, and 400+ holders, browsable through a campus map, dashboard, directory, and catalog.</p>
                            <p class="project-detail">Legacy multi-sheet Excel exports round-trip through ExcelJS by matching six sheets' worth of inconsistent column headings, and paper request/return forms get parsed automatically with pdf.js and a Tesseract OCR fallback. Row-level security and a swappable localStorage/Supabase layer let the platform serve multiple organizations from one codebase, with a full issue/return workflow and an admin console for managing access.</p>
                            <div class="project-tags"><span>React</span><span>TypeScript</span><span>Vite</span><span>Supabase</span><span>ExcelJS</span><span>Tesseract OCR</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/Fipher-Keys" target="_blank" rel="noreferrer">GitHub</a>
                                <a class="win-button" href="https://fipher-keys.vercel.app/" target="_blank" rel="noreferrer">Live Site</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/terminal-quest.png" alt="Terminal Quest project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Interactive Learning Platform</p>
                            <h3 class="project-title">Terminal Quest</h3>
                            <p class="project-meta">Most Linux tutorials tell you what a command does; Terminal Quest makes you use one to get anywhere. Rooms are directories, locked doors are folders you can't cd into yet, and items are files you ls, cat, and mv your way toward.</p>
                            <p class="project-detail">Gemini, wired in through Supabase Edge Functions, generates levels and rooms on the fly and tutors players mid-run, with a deterministic local fallback so the game keeps working if the API doesn't respond. Email/Google auth, persistent saves, per-player stats, and a command-mastery profile track exactly which commands someone still needs practice with.</p>
                            <div class="project-tags"><span>TypeScript</span><span>React</span><span>Supabase</span><span>Gemini API</span><span>Command Parser</span><span>Game UI</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/TerminalQuest" target="_blank" rel="noreferrer">GitHub</a>
                                <a class="win-button" href="https://terminalquest-puce.vercel.app" target="_blank" rel="noreferrer">Live Site</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="https://opengraph.githubassets.com/1/MrFiscus/EveryCent" alt="EveryCent project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">AI Grocery Price Forecasting</p>
                            <h3 class="project-title">EveryCent</h3>
                            <p class="project-meta">Retailers get algorithmic pricing intelligence; grocery shoppers get sticker shock. EveryCent closes that gap by running 25 years of USDA retail price data through Google TimesFM 2.0 on BigQuery ML, hitting an R&sup2; of 0.91 against a 0.76 moving-average baseline (MAE: $0.06) &mdash; good enough to win Best Statistical Model out of 800+ teams at HackDavis 2026.</p>
                            <p class="project-detail">The forecasts turn into plain buy/wait/stable calls timed to SNAP benefit cycles, so the households most exposed to price swings get the earliest warning. Claude Haiku layers real-time web search on top to explain why a price is moving, next to the TimesFM chart and a running smart shopping list.</p>
                            <div class="project-tags"><span>React</span><span>TypeScript</span><span>Python</span><span>BigQuery ML</span><span>TimesFM 2.0</span><span>Claude API</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/EveryCent" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/handall.png" alt="HandAll project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">AI Productivity Tool</p>
                            <h3 class="project-title">HandAll</h3>
                            <p class="project-meta">Static to-do lists don't account for burnout; HandAll does. A React/TypeScript frontend and Node/Express backend hand scheduling off to a Python FastAPI service running LangGraph agents that decompose tasks and redistribute workload as capacity changes.</p>
                            <p class="project-detail">Google Calendar OAuth and iCal/ICS import feed real commitments into the planner with a preview step before anything syncs, and a motivation slider lets a student nudge the AI between "recovery mode" and "lock-in mode" and watch the whole week rebalance live. I built the Calendar connect flow as part of a 4-person team that shipped the full product in a 36-hour hackathon sprint.</p>
                            <div class="project-tags"><span>TypeScript</span><span>FastAPI</span><span>LangGraph</span><span>Google Calendar</span><span>Docker</span><span>Hackathon Build</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/HandAll" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="https://raw.githubusercontent.com/MrFiscus/DrPrompt/main/ui-preview/image.png" alt="Dr. Prompt extension screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Chrome Extension</p>
                            <h3 class="project-title">Dr. Prompt</h3>
                            <p class="project-meta">A rough, vague prompt gets a rough, vague answer out of any model. Dr. Prompt catches that before you hit send: a Manifest V3 extension that rewrites your prompt with the Claude API, falling back to a local rule-based optimizer the moment the API is unreachable.</p>
                            <p class="project-detail">Inline suggestion bubbles appear directly inside ChatGPT, Claude, Gemini, Mistral, and Perplexity, and a right-click context menu sends any selected webpage text straight into the optimizer. A searchable Popular Prompts library with category filters and a before/after token count makes the efficiency gain visible instead of just implied.</p>
                            <div class="project-tags"><span>JavaScript</span><span>Chrome Extension API</span><span>Manifest V3</span><span>Claude API</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/DrPrompt" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/How-performativeami.png" alt="How Performative Am I project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Music Data App</p>
                            <h3 class="project-title">How Performative Am I?</h3>
                            <p class="project-meta">"Performative" listening became a whole internet joke, so I built the app that scores it. It pulls your real Spotify history through OAuth PKCE and turns your top artists into a shareable performative score, no manual data entry required.</p>
                            <p class="project-detail">The scoring model weighs genre signals and listening patterns rather than just artist names, and the result screen is built to be screenshotted &mdash; which is most of why it spread. Public launch meant hardening the OAuth flow and rate-limiting Spotify calls for traffic I couldn't predict in advance.</p>
                            <div class="project-tags"><span>React</span><span>TypeScript</span><span>Spotify API</span><span>OAuth PKCE</span><span>Data UI</span><span>Public Launch</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/howperformativeami" target="_blank" rel="noreferrer">GitHub</a>
                                <a class="win-button" href="https://www.howperformativeami.com/" target="_blank" rel="noreferrer">Live Site</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/fiscus-films.png" alt="Fiscus Films project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Movie Discovery Platform</p>
                            <h3 class="project-title">Fiscus Films</h3>
                            <p class="project-meta">Fiscus Films proxies TMDB through my own backend so API keys never touch the client, then layers user profiles, favorites, and search history with Supabase auth and storage on top of that base.</p>
                            <p class="project-detail">Socket.IO pushes activity updates in real time instead of relying on polling or a page refresh, which is what makes browsing feel responsive rather than static. Favorites, profiles, and search history all persist server-side, so a user's watchlist survives across devices and sessions.</p>
                            <div class="project-tags"><span>JavaScript</span><span>Express</span><span>Socket.IO</span><span>Supabase</span><span>TMDB API</span><span>Auth</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/FiscusFilms" target="_blank" rel="noreferrer">GitHub</a>
                                <a class="win-button" href="https://fiscusfilms.vercel.app" target="_blank" rel="noreferrer">Live Site</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/cine-list.png" alt="CineList project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Personal Media Tracker</p>
                            <h3 class="project-title">CineList</h3>
                            <p class="project-meta">Star ratings flatten a watch history into a single number. CineList organizes films by the country they were made in instead, so your list reads as a map of what cultures and industries you've actually explored on screen.</p>
                            <p class="project-detail">Logging a film tags it to its country of origin automatically, and the interface surfaces gaps &mdash; regions you haven't watched anything from yet &mdash; the way a passport stamp collection would, rather than just another sortable table.</p>
                            <div class="project-tags"><span>CSS</span><span>JavaScript</span><span>Movie Tracker</span><span>Frontend UI</span><span>Product Design</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/CineList" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image project-image-weather" src="Projects/weather-app.png" alt="Weather App OOD project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Object-Oriented Coursework</p>
                            <h3 class="project-title">Weather App OOD</h3>
                            <p class="project-meta">Built for my Object-Oriented Design course, this C# weather app is less about the forecast and more about the class diagram behind it &mdash; a graded exercise in keeping data fetching, parsing, and display in separate, single-responsibility classes.</p>
                            <p class="project-detail">Each layer only knows about the interface of the layer next to it, so swapping the weather data source wouldn't touch the UI code at all &mdash; the whole point of the assignment.</p>
                            <div class="project-tags"><span>C#</span><span>Object-Oriented Design</span><span>Coursework</span><span>Class Structure</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/weatherapp-OOD" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image project-image-asm" src="Projects/asm-terminal-game.png" alt="ASM Terminal Game project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Low-Level Programming</p>
                            <h3 class="project-title">ASM Terminal Game</h3>
                            <p class="project-meta">No engine, no framework, no garbage collector &mdash; just registers and memory. This Pac-Man-inspired terminal game is written directly in Assembly, with every frame of movement and every collision check handled by hand.</p>
                            <p class="project-detail">Rendering the maze and moving the player meant managing screen buffers and input polling manually, the kind of groundwork that a game engine normally hides completely. It forced a much more literal understanding of what a "game loop" actually costs at the instruction level.</p>
                            <div class="project-tags"><span>Assembly</span><span>Terminal Game</span><span>Game Loop</span><span>Low-Level Logic</span><span>Pac-Man Inspired</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/asm_terminal_game" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/Rocket-car.png" alt="Rocketcar project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Unity Game Development</p>
                            <h3 class="project-title">Rocketcar</h3>
                            <p class="project-meta">Rocketcar is a small arcade prototype about cars that fly: tuning thrust, drag, and gravity in Unity's physics engine until a car flipping through the air still feels controllable instead of random.</p>
                            <p class="project-detail">Getting the flight feel right meant iterating on rigidbody mass, drag curves, and input response dozens of times &mdash; the kind of tuning work that matters far more to "does this feel good" than any single line of gameplay code.</p>
                            <div class="project-tags"><span>Unity</span><span>Game Development</span><span>Physics</span><span>3D Gameplay</span><span>ASP.NET Repo Language</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/rocketcar" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="https://opengraph.githubassets.com/fiscus-baller-3d/MrFiscus/Baller-3D" alt="Baller-3D GitHub preview" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Unity 3D Game</p>
                            <h3 class="project-title">Baller-3D</h3>
                            <p class="project-meta">A compact 3D ball-physics game built to learn Unity's scene and prefab workflow from the ground up &mdash; how a level actually gets assembled, not just how a script gets attached to an object.</p>
                            <p class="project-detail">Ball momentum, bounce response, and collision layers all needed separate tuning passes before movement stopped feeling floaty, which turned out to be most of the actual "gameplay programming" in a physics-driven game like this one.</p>
                            <div class="project-tags"><span>Unity</span><span>3D Game</span><span>Gameplay Systems</span><span>Player Controls</span><span>ASP.NET Repo Language</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/Baller-3D" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/Vsn-competition.png" alt="Vsn-Competition project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Winning Web Dev Competition</p>
                            <h3 class="project-title">Vsn-Competition</h3>
                            <p class="project-meta">Concept to finished, deployed site in 5 hours flat, against a clock and other competitors building the same brief &mdash; and it won.</p>
                            <p class="project-detail">With no time to second-guess layout decisions, scope got cut ruthlessly to whatever moved the site from "started" to "shippable" fastest, which ended up being the actual skill being tested: judgment under a deadline, not just code output.</p>
                            <div class="project-tags"><span>Web Development</span><span>Competition Winner</span><span>5-Hour Build</span><span>Frontend</span><span>Rapid Prototyping</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/Vsn-Competition" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                    <article class="project-card">
                        <div class="project-image-frame"><img class="project-image" src="Projects/fiscus-terminal.png" alt="Fiscus Terminal project screenshot" loading="lazy"></div>
                        <div class="project-content">
                            <p class="project-kicker">Portfolio Interface</p>
                            <h3 class="project-title">Fiscus Terminal</h3>
                            <p class="project-meta">This site. A resume that refused to be a PDF, so it became a Windows 95 desktop instead &mdash; draggable windows, a working taskbar, popup apps, and a terminal you can actually type commands into.</p>
                            <p class="project-detail">No build step, no backend, no framework &mdash; just HTML, CSS, and vanilla JavaScript deployed straight to GitHub Pages, with window management, drag physics, and mobile responsiveness all hand-rolled instead of pulled from a UI library.</p>
                            <div class="project-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Static Site</span><span>GitHub Pages</span><span>Responsive UI</span></div>
                            <div class="action-row">
                                <a class="win-button" href="https://github.com/MrFiscus/fiscus-terminal" target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                </section>
            `,
        },
        skills: {
            title: "Skills.ini",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-skills" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Technical Skills</p>
                        <h2 class="popup-hero-title">Toolbox</h2>
                        <p class="popup-hero-text">A practical mix of skills reflected across my GitHub projects: web apps, APIs, data structures, C#/C++ coursework, Assembly games, and Unity-style experiments.</p>
                    </div>
                </section>
                <section class="skills-console">
                    <div class="skills-sidebar">
                        <button class="skill-tab is-active" data-skill-tab="frontend" type="button">Frontend</button>
                        <button class="skill-tab" data-skill-tab="backend" type="button">Backend</button>
                        <button class="skill-tab" data-skill-tab="security" type="button">Security</button>
                        <button class="skill-tab" data-skill-tab="cs" type="button">CS/Game</button>
                        <button class="skill-tab" data-skill-tab="people" type="button">People</button>
                    </div>
                    <div class="skills-panel">
                        <article class="skill-group is-active" data-skill-panel="frontend">
                            <div class="skill-group-header">
                                <span class="skill-group-icon icon-projects" aria-hidden="true"></span>
                                <div>
                                    <h3>Frontend + UI</h3>
                                    <p>Building interfaces that are usable, memorable, and responsive.</p>
                                </div>
                            </div>
                            <div class="skill-breakdown">
                                <div class="skill-row"><span>HTML</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 92%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>CSS</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 88%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>JavaScript</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 84%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>TypeScript</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 74%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>React</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 78%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Responsive UI</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 82%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Static Sites</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 86%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Bootstrap</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 72%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Figma</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 70%"></div></div><b>Growing</b></div>
                            </div>
                        </article>
                        <article class="skill-group" data-skill-panel="backend">
                            <div class="skill-group-header">
                                <span class="skill-group-icon icon-terminal" aria-hidden="true"></span>
                                <div>
                                    <h3>Backend + APIs</h3>
                                    <p>Connecting apps to services, auth, persistence, and external APIs.</p>
                                </div>
                            </div>
                            <div class="skill-breakdown">
                                <div class="skill-row"><span>FastAPI</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 68%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Express</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 72%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Supabase</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 74%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Socket.IO</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 64%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>REST APIs</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 76%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Auth Flows</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 66%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Python</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 76%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Dockerfile</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 48%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>PowerShell</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 52%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>SQL</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 68%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Git/GitHub</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 82%"></div></div><b>Strong</b></div>
                            </div>
                        </article>
                        <article class="skill-group" data-skill-panel="security">
                            <div class="skill-group-header">
                                <span class="skill-group-icon icon-skills" aria-hidden="true"></span>
                                <div>
                                    <h3>Systems + Security</h3>
                                    <p>Practicing lower-level thinking, CTF-style problem solving, and security fundamentals.</p>
                                </div>
                            </div>
                            <div class="skill-breakdown">
                                <div class="skill-row"><span>Cybersecurity</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 70%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Linux Commands</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 76%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Assembly</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 58%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>C#</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 64%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>OOD</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 68%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>CTF Practice</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 72%"></div></div><b>Active</b></div>
                                <div class="skill-row"><span>Data Structures</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 70%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Algorithms</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 64%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Networking Basics</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 62%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>Command Line</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 74%"></div></div><b>Comfortable</b></div>
                            </div>
                        </article>
                        <article class="skill-group" data-skill-panel="cs">
                            <div class="skill-group-header">
                                <span class="skill-group-icon icon-projects" aria-hidden="true"></span>
                                <div>
                                    <h3>CS Coursework + Game Projects</h3>
                                    <p>Languages and concepts that show up in coursework, tree assignments, calculators, terminal games, and Unity-style repos.</p>
                                </div>
                            </div>
                            <div class="skill-breakdown">
                                <div class="skill-row"><span>C++</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 70%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>Splay Trees</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 66%"></div></div><b>Coursework</b></div>
                                <div class="skill-row"><span>DSW Algorithm</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 62%"></div></div><b>Coursework</b></div>
                                <div class="skill-row"><span>C#</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 68%"></div></div><b>Growing</b></div>
                                <div class="skill-row"><span>ASP.NET Repo Work</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 58%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>Unity Game Concepts</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 60%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>Assembly</span><div class="meter-track"><div class="meter-fill meter-fill-gold" style="width: 58%"></div></div><b>Learning</b></div>
                                <div class="skill-row"><span>Makefile Basics</span><div class="meter-track"><div class="meter-fill meter-fill-blue" style="width: 50%"></div></div><b>Learning</b></div>
                            </div>
                        </article>
                        <article class="skill-group" data-skill-panel="people">
                            <div class="skill-group-header">
                                <span class="skill-group-icon icon-contact" aria-hidden="true"></span>
                                <div>
                                    <h3>People + Operations</h3>
                                    <p>Supporting students, handling office workflows, organizing events, and communicating clearly.</p>
                                </div>
                            </div>
                            <div class="skill-breakdown">
                                <div class="skill-row"><span>Customer Service</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 90%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Office Operations</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 86%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Microsoft Office</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 84%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Peer Tutoring</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 82%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Event Support</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 78%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Writing</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 80%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Team Collaboration</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 86%"></div></div><b>Strong</b></div>
                                <div class="skill-row"><span>Documentation</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 78%"></div></div><b>Comfortable</b></div>
                                <div class="skill-row"><span>Problem Solving</span><div class="meter-track"><div class="meter-fill meter-fill-teal" style="width: 84%"></div></div><b>Strong</b></div>
                            </div>
                        </article>
                    </div>
                </section>
            `,
        },
        achievements: {
            title: "Achievements.dat",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-achievements" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Competitions</p>
                        <h2 class="popup-hero-title">Recent Results</h2>
                        <p class="popup-hero-text">CTFs, hackathons, and team competitions that shaped how I build under pressure.</p>
                    </div>
                </section>
                <section class="timeline-list">
                    <article class="timeline-item"><div><h3 class="timeline-title">HiveCTF</h3><p class="timeline-meta">Competitor - 1st Place</p></div><span class="timeline-date">Feb 2026</span></article>
                    <article class="timeline-item"><div><h3 class="timeline-title">Ignite Hackathon</h3><p class="timeline-meta">Full Stack Developer - Terminal Quest</p></div><span class="timeline-date">Apr 2026</span></article>
                    <article class="timeline-item"><div><h3 class="timeline-title">Nepal-US Hackathon</h3><p class="timeline-meta">Lead Backend / AI Developer</p></div><span class="timeline-date">Feb 2026</span></article>
                    <article class="timeline-item"><div><h3 class="timeline-title">NCAE Cyber Games Regionals</h3><p class="timeline-meta">Database and Router - 5th Place</p></div><span class="timeline-date">Feb 2026</span></article>
                </section>
            `,
        },
        contact: {
            title: "Contact.msg",
            content: `
                <section class="popup-hero">
                    <span class="popup-hero-icon icon-contact" aria-hidden="true"></span>
                    <div>
                        <p class="popup-kicker">Contact</p>
                        <h2 class="popup-hero-title">Let's Connect</h2>
                        <p class="popup-hero-text">Send a quick message or pick a channel below. These tiles behave like old desktop shortcuts, just less dusty.</p>
                    </div>
                </section>
                <form class="mail-composer" action="mailto:contact.smaranpokharel@gmail.com" method="post" enctype="text/plain">
                    <div class="mail-toolbar">
                        <button class="win-button mail-send-button" type="submit">
                            <span class="mail-button-icon icon-contact" aria-hidden="true"></span>
                            Send
                        </button>
                    </div>
                    <div class="mail-paper">
                        <h3 class="mail-title">New Message</h3>
                        <label class="mail-row">
                            <span>To:</span>
                            <input type="text" name="to" value="Smaran Pokharel <contact.smaranpokharel@gmail.com>" readonly>
                        </label>
                        <label class="mail-row">
                            <span>Subject:</span>
                            <input type="text" name="subject" placeholder="Portfolio inquiry">
                        </label>
                        <label class="mail-row">
                            <span>From:</span>
                            <input type="email" name="from" placeholder="your.email@example.com">
                        </label>
                        <textarea class="mail-message" name="body" placeholder="Hi Smaran, I saw your portfolio and wanted to reach out about..."></textarea>
                    </div>
                </form>
                <section class="contact-grid">
                    <a class="contact-card" href="tel:+17814756319"><span class="contact-card-icon icon-phone" aria-hidden="true"></span><span><p class="contact-label">Phone</p><p class="contact-value">+1 781 475 6319</p></span></a>
                    <a class="contact-card" href="https://github.com/MrFiscus" target="_blank" rel="noreferrer"><span class="contact-card-icon icon-github" aria-hidden="true"></span><span><p class="contact-label">GitHub</p><p class="contact-value">github.com/MrFiscus</p></span></a>
                    <a class="contact-card" href="https://www.linkedin.com/in/smaran-pokharel-12a720305/" target="_blank" rel="noreferrer"><span class="contact-card-icon icon-linkedin" aria-hidden="true"></span><span><p class="contact-label">LinkedIn</p><p class="contact-value">linkedin.com/in/smaran-pokharel</p></span></a>
                </section>
            `,
        },
        resume: {
            title: "Résumé",
            content: `
                <div class="resume-viewer">
                    <div class="resume-toolbar" role="toolbar" aria-label="Resume actions">
                        <a class="resume-toolbar-button" href="${resumePdf}" download="Smaran-Pokharel-Resume.pdf">
                            <span class="resume-toolbar-icon icon-resume" aria-hidden="true"></span>
                            Download
                        </a>
                        <a class="resume-toolbar-button" href="${resumePdf}" target="_blank" rel="noreferrer">
                            <span class="resume-toolbar-icon icon-github" aria-hidden="true"></span>
                            Open In New Tab
                        </a>
                    </div>
                    <div class="resume-frame-wrap">
                        <iframe class="resume-frame" src="${resumePdf}#toolbar=0&navpanes=0" title="Resume PDF"></iframe>
                    </div>
                </div>
            `,
        },
    };

    input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
            return;
        }

        const command = input.value.trim().toLowerCase();
        input.value = "";

        if (!command) {
            return;
        }

        flashTerminalInput();
        runCommand(command);
    });

    startButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleStartMenu();
    });

    window.handleWindowButton = (control) => {
        handleWindowAction(control);
    };

    document.addEventListener("click", (event) => {
        const windowControl = event.target.closest("[data-window-action]");
        if (windowControl) {
            event.preventDefault();
            event.stopPropagation();
            handleWindowAction(windowControl);
            return;
        }

        const desktopIcon = event.target.closest(".desktop-icon");
        if (desktopIcon) {
            selectDesktopIcon(desktopIcon);
        }

        const skillTab = event.target.closest("[data-skill-tab]");
        if (skillTab) {
            event.preventDefault();
            switchSkillTab(skillTab);
            return;
        }

        const copyCommand = event.target.closest("[data-copy-command]");
        if (copyCommand) {
            event.preventDefault();
            fillTerminalCommand(copyCommand.dataset.copyCommand);
            return;
        }

        const trigger = event.target.closest("[data-command]");

        if (trigger) {
            runCommand(trigger.dataset.command);
            closeStartMenu();
            return;
        }

        if (!event.target.closest("#start-menu") && !event.target.closest("#start-button")) {
            closeStartMenu();
        }
    });

    const terminalWindow = document.querySelector(".terminal-window");
    if (terminalWindow) {
        terminalWindow.dataset.windowTitle = "Portfolio Terminal";
        terminalWindow.dataset.windowIcon = "icon-terminal";
        makeDraggable(terminalWindow, ".window-titlebar");
        registerWindow(terminalWindow);
        bindWindowActivation(terminalWindow);
        activateWindow(terminalWindow);
    }

    function appendOutput(text) {
        const entry = document.createElement("p");
        entry.className = "output";
        entry.innerHTML = `<span class="terminal-prompt">guest@portfolio:~$</span> <span class="terminal-command-text">${escapeHtml(text)}</span>`;
        outputArea.appendChild(entry);
        outputArea.scrollTop = outputArea.scrollHeight;
    }

    function appendLine(text = "", tone = "") {
        const entry = document.createElement("p");
        entry.className = `output terminal-line${tone ? ` terminal-line-${tone}` : ""}`;
        entry.textContent = text;
        outputArea.appendChild(entry);
        outputArea.scrollTop = outputArea.scrollHeight;
    }

    function escapeHtml(text) {
        return String(text)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function runCommand(command) {
        const normalizedCommand = command.trim().toLowerCase();

        if (command === "terminal") {
            restoreTerminal();
            return;
        }

        if (normalizedCommand === "clear") {
            clearTerminal();
            return;
        }

        if (runTerminalEasterEgg(normalizedCommand)) {
            return;
        }

        if (!commandPanels[normalizedCommand]) {
            appendOutput(`Unknown command: ${command}`);
            appendLine("Type 'help' to see available commands.", "error");
            return;
        }

        appendOutput(normalizedCommand);
        if (normalizedCommand === "help") {
            printTerminalHelp();
        }
        openPopup(commandPanels[normalizedCommand].title, commandPanels[normalizedCommand].content, commandIcons[normalizedCommand]);
    }

    function printTerminalHelp() {
        appendLine("Navigation: about | education | experience | projects | skills | contact | resume", "info");
        appendLine("Terminal:   ls | whoami | date | clear | terminal", "success");
        appendLine("Fun stuff:  sudo | coffee | theme | neofetch | konami", "warning");
        appendLine("");
    }

    function runTerminalEasterEgg(command) {
        const now = new Date();
        const handlers = {
            ls: () => [
                "About.txt        Education.doc     Experience.log",
                "Projects.exe     Skills.ini        Contact.msg",
                "Resume.pdf       Terminal.exe      secrets/",
            ],
            dir: () => [
                "ABOUT.TXT        EDUCATION.DOC     EXPERIENCE.LOG",
                "PROJECTS.EXE     SKILLS.INI        CONTACT.MSG",
                "RESUME.PDF       TERMINAL.EXE      SECRETS",
            ],
            whoami: () => ["guest@portfolio", "Access level: curious visitor"],
            pwd: () => ["C:\\Portfolio\\Smaran\\Desktop"],
            date: () => [now.toLocaleString()],
            time: () => [now.toLocaleTimeString()],
            neofetch: () => [
                "SmaranOS 95",
                "Host: Portfolio Terminal",
                "Shell: curiosity.exe",
                "Stack: HTML / CSS / JS / React / Python / C++",
                "Theme: retro teal + terminal amber",
            ],
            theme: () => ["Theme locked: Windows 95-ish, but make it Smaran."],
            sudo: () => ["Permission denied. Nice try though."],
            "sudo hire smaran": () => ["Permission granted. Opening recruiter.exe... just kidding, email me."],
            coffee: () => ["     )  (", "    (   ) )", "     ) ( (", "   _______        coffee.exe loaded", "  <_______>       productivity +12"],
            konami: () => ["↑ ↑ ↓ ↓ ← → ← → B A", "Cheat unlocked: extra personality mode enabled."],
            secrets: () => ["Hidden folder says: build cool things and document them well."],
            "cd secrets": () => ["You found secrets/, but it is mostly unfinished project ideas."],
        };

        if (!handlers[command]) {
            return false;
        }

        appendOutput(command);
        const tone = command === "sudo" ? "error" : ["coffee", "konami", "theme"].includes(command) ? "warning" : "success";
        handlers[command]().forEach((line) => appendLine(line, tone));
        appendLine("");
        return true;
    }

    function restoreTerminal() {
        const terminalWindow = document.querySelector(".terminal-window");
        if (!terminalWindow) {
            return;
        }

        terminalWindow.classList.remove("is-closed", "is-minimized", "is-maximized");
        removeTaskButton(terminalWindow);
        activateWindow(terminalWindow);
        input?.focus();
    }

    function switchSkillTab(tab) {
        const consoleElement = tab.closest(".skills-console");
        if (!consoleElement) {
            return;
        }

        const target = tab.dataset.skillTab;
        consoleElement.querySelectorAll("[data-skill-tab]").forEach((button) => {
            button.classList.toggle("is-active", button === tab);
        });

        consoleElement.querySelectorAll("[data-skill-panel]").forEach((panel) => {
            panel.classList.toggle("is-active", panel.dataset.skillPanel === target);
        });
    }

    function clearTerminal() {
        outputArea.innerHTML = welcomeMarkup;
        removePopup();
        const terminalWindow = document.querySelector(".terminal-window");
        if (terminalWindow) {
            terminalWindow.classList.remove("is-closed", "is-minimized", "is-maximized");
            removeTaskButton(terminalWindow);
        }
    }

    function toggleStartMenu() {
        if (!startMenu || !startButton) {
            return;
        }

        const isOpen = startMenu.classList.toggle("is-open");
        startButton.setAttribute("aria-expanded", String(isOpen));
    }

    function closeStartMenu() {
        startMenu?.classList.remove("is-open");
        startButton?.setAttribute("aria-expanded", "false");
    }

    function openPopup(title, content, iconClass = "icon-help") {
        removePopup();

        const popup = document.createElement("section");
        popup.className = "popup-window";
        if (iconClass === "icon-resume") {
            popup.classList.add("resume-window");
        }
        if (iconClass === "icon-projects") {
            popup.classList.add("projects-window");
        }
        popup.dataset.windowTitle = title;
        popup.dataset.windowIcon = iconClass;
        popup.innerHTML = `
            <div class="popup-titlebar">
                <div class="titlebar-left">
                    <span class="titlebar-app-icon ${iconClass}" aria-hidden="true"></span>
                    <span class="popup-title-text">${title}</span>
                </div>
                <div class="titlebar-controls">
                    <button class="titlebar-button" data-window-action="minimize" onclick="event.stopPropagation(); window.handleWindowButton(this); return false;" type="button" aria-label="Minimize ${title}">_</button>
                    <button class="titlebar-button" data-window-action="maximize" onclick="event.stopPropagation(); window.handleWindowButton(this); return false;" type="button" aria-label="Maximize ${title}">[]</button>
                    <button class="popup-close" data-window-action="close" onclick="event.stopPropagation(); window.handleWindowButton(this); return false;" type="button" aria-label="Close ${title}">X</button>
                </div>
            </div>
            <div class="popup-body">${content}</div>
            <div class="window-statusbar">
                <span>Ready</span>
                <span>${title}</span>
            </div>
        `;

        document.body.appendChild(popup);
        makeDraggable(popup, ".popup-titlebar");
        registerWindow(popup);
        bindWindowActivation(popup);
        activateWindow(popup);
    }

    function removePopup() {
        const popup = document.querySelector(".popup-window");
        if (!popup) {
            return;
        }

        removeTaskButton(popup);
        popup.remove();
    }

    function registerWindow(windowElement) {
        if (!windowElement.dataset.windowId) {
            windowElement.dataset.windowId = `window-${++windowTaskId}`;
        }
    }

    function activateWindow(windowElement) {
        if (!windowElement || windowElement.classList.contains("is-minimized")) {
            return;
        }

        document.querySelectorAll(".terminal-window, .popup-window").forEach((openWindow) => {
            openWindow.classList.toggle("is-active-window", openWindow === windowElement);
        });
        registerWindow(windowElement);
        windowElement.style.zIndex = String(topWindowZIndex++);
    }

    function selectDesktopIcon(icon) {
        document.querySelectorAll(".desktop-icon.is-selected").forEach((selectedIcon) => {
            selectedIcon.classList.remove("is-selected");
        });
        icon.classList.add("is-selected");
        icon.classList.add("is-launching");
        window.setTimeout(() => icon.classList.remove("is-launching"), 220);
    }

    function flashTerminalInput() {
        const inputRow = document.querySelector(".terminal-input-row");
        if (!inputRow) {
            return;
        }

        inputRow.classList.remove("is-flashing");
        void inputRow.offsetWidth;
        inputRow.classList.add("is-flashing");
    }

    function fillTerminalCommand(command) {
        restoreTerminal();
        input.value = command;
        input.focus();
        flashTerminalInput();
    }

    function bindWindowActivation(windowElement) {
        if (!windowElement || windowElement.dataset.activatesOnClick === "true") {
            return;
        }

        windowElement.dataset.activatesOnClick = "true";
        const activate = () => activateWindow(windowElement);

        if (window.PointerEvent) {
            windowElement.addEventListener("pointerdown", activate);
        } else {
            windowElement.addEventListener("mousedown", activate);
            windowElement.addEventListener("touchstart", activate, { passive: true });
        }
    }

    function handleWindowAction(control) {
        const windowElement = control.closest(".terminal-window, .popup-window");
        if (!windowElement) {
            return;
        }

        registerWindow(windowElement);

        const action = control.dataset.windowAction;
        if (action === "minimize") {
            minimizeWindow(windowElement);
            return;
        }

        if (action === "maximize") {
            toggleMaximizeWindow(windowElement);
            return;
        }

        if (action === "close") {
            closeWindow(windowElement);
        }
    }

    function closeWindow(windowElement) {
        removeTaskButton(windowElement);

        if (windowElement.classList.contains("terminal-window")) {
            windowElement.classList.add("is-closed");
            windowElement.classList.remove("is-minimized", "is-maximized");
            document.querySelector(".popup-window") && activateWindow(document.querySelector(".popup-window"));
            return;
        }

        windowElement.remove();
        const terminalWindow = document.querySelector(".terminal-window:not(.is-closed):not(.is-minimized)");
        if (terminalWindow) {
            activateWindow(terminalWindow);
        }
    }

    function minimizeWindow(windowElement) {
        windowElement.classList.add("is-minimized");
        windowElement.classList.remove("is-maximized");
        createTaskButton(windowElement);
        const nextWindow = document.querySelector(".popup-window:not(.is-minimized), .terminal-window:not(.is-minimized):not(.is-closed)");
        if (nextWindow) {
            activateWindow(nextWindow);
        }
    }

    function restoreWindow(windowElement) {
        windowElement.classList.remove("is-minimized");
        removeTaskButton(windowElement);
        activateWindow(windowElement);
    }

    function toggleMaximizeWindow(windowElement) {
        restoreWindow(windowElement);
        windowElement.classList.toggle("is-maximized");
        windowElement.style.zIndex = String(topWindowZIndex++);
    }

    function createTaskButton(windowElement) {
        if (!taskbarTray || !windowElement.dataset.windowId) {
            return;
        }

        const existingButton = taskbarTray.querySelector(`[data-task-window="${windowElement.dataset.windowId}"]`);
        if (existingButton) {
            return;
        }

        const button = document.createElement("button");
        button.className = "task-button";
        button.type = "button";
        button.dataset.taskWindow = windowElement.dataset.windowId;
        button.innerHTML = `
            <span class="task-button-icon ${windowElement.dataset.windowIcon || "icon-help"}" aria-hidden="true"></span>
            <span>${windowElement.dataset.windowTitle || "Window"}</span>
        `;
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            restoreWindow(windowElement);
        });
        taskbarTray.appendChild(button);
    }

    function removeTaskButton(windowElement) {
        if (!taskbarTray || !windowElement.dataset.windowId) {
            return;
        }

        taskbarTray.querySelector(`[data-task-window="${windowElement.dataset.windowId}"]`)?.remove();
    }

    function makeDraggable(windowElement, handleSelector) {
        const handle = windowElement.querySelector(handleSelector);

        if (!handle || windowElement.dataset.draggable === "true") {
            return;
        }

        windowElement.dataset.draggable = "true";

        const getPoint = (event) => {
            const touch = event.touches?.[0] || event.changedTouches?.[0];
            return {
                clientX: touch?.clientX ?? event.clientX,
                clientY: touch?.clientY ?? event.clientY,
            };
        };

        const startDragging = (event) => {
            if (event.target.closest("button, a, input") || windowElement.classList.contains("is-maximized")) {
                return;
            }

            event.preventDefault();
            const rect = windowElement.getBoundingClientRect();
            const point = getPoint(event);
            const offsetX = point.clientX - rect.left;
            const offsetY = point.clientY - rect.top;

            windowElement.style.position = "fixed";
            windowElement.style.left = `${rect.left}px`;
            windowElement.style.top = `${rect.top}px`;
            windowElement.style.margin = "0";
            windowElement.style.transform = "none";
            windowElement.style.zIndex = String(topWindowZIndex++);
            windowElement.classList.add("is-dragging");

            if (event.pointerId !== undefined) {
                handle.setPointerCapture?.(event.pointerId);
            }

            const moveWindow = (moveEvent) => {
                const movePoint = getPoint(moveEvent);
                const maxLeft = Math.max(0, window.innerWidth - windowElement.offsetWidth);
                const maxTop = Math.max(0, window.innerHeight - windowElement.offsetHeight);
                const nextLeft = Math.min(Math.max(0, movePoint.clientX - offsetX), maxLeft);
                const nextTop = Math.min(Math.max(0, movePoint.clientY - offsetY), maxTop);

                windowElement.style.left = `${nextLeft}px`;
                windowElement.style.top = `${nextTop}px`;
            };

            const stopDragging = () => {
                windowElement.classList.remove("is-dragging");
                document.removeEventListener("pointermove", moveWindow);
                document.removeEventListener("pointerup", stopDragging);
                document.removeEventListener("pointercancel", stopDragging);
                document.removeEventListener("mousemove", moveWindow);
                document.removeEventListener("mouseup", stopDragging);
                document.removeEventListener("touchmove", moveWindow);
                document.removeEventListener("touchend", stopDragging);
                document.removeEventListener("touchcancel", stopDragging);
            };

            if (event.type === "pointerdown") {
                document.addEventListener("pointermove", moveWindow);
                document.addEventListener("pointerup", stopDragging);
                document.addEventListener("pointercancel", stopDragging);
            } else if (event.type === "touchstart") {
                document.addEventListener("touchmove", moveWindow, { passive: false });
                document.addEventListener("touchend", stopDragging);
                document.addEventListener("touchcancel", stopDragging);
            } else {
                document.addEventListener("mousemove", moveWindow);
                document.addEventListener("mouseup", stopDragging);
            }
        };

        if (window.PointerEvent) {
            handle.addEventListener("pointerdown", startDragging);
        } else {
            handle.addEventListener("mousedown", startDragging);
            handle.addEventListener("touchstart", startDragging, { passive: false });
        }
    }

    function updateClock() {
        if (!taskbarClock) {
            return;
        }

        const time = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date());

        taskbarClock.textContent = time;
    }

    updateClock();
    window.setInterval(updateClock, 60000);
});
