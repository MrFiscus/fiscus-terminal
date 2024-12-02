document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("terminal-input");
    const outputArea = document.getElementById("output-area");
    const tabsContainer = document.getElementById("tabs-container");

    const commands = {
        about: () => {
            appendOutput("Showing information about me");
            createPopup("About Me", `
                <div class="about-me-content">
                    <img src="image-self.jpg" alt="Your Name" class="about-me-image">
                    <div class="about-me-text">
                        <p>I’m an 18-year-old with a deep passion for <span class=sub-about> web development </span> and <span class=sub-about> design</span>. Currently a freshman at <span class=sub-about>Dakota State University </span>, I am skilled in <span class=sub-about> HTML, CSS, JavaScript </span>, and <span class=sub-about>web frameworks </span> , with hands-on experience building functional, high-quality websites. My strong background in graphic design, coupled with expertise in tools like <span class=sub-about> Photoshop</span> and <span class=sub-about> Figma </span>, allows me to deliver creative and polished projects that blend functionality with aesthetics.</p>
                    </div>
                </div>
            `);
        },
        skills: () => {
            appendOutput("Showing my skills");
            createPopup("My Skills", `<div class="skills-popup">
  <ul>
    <li>
      <b>HTML & CSS </b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 97%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>JavaScript</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 85%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>C programming</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 80%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>Python</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 60%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>React.JS</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 40%;"></div> <!-- Adjust width percentage as needed -->
      </div>
      <li>
      <b>Photoshop</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 89%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>Figma</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 90%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>PhP</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 65%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    <li>
      <b>WordPress</b>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 85%;"></div> <!-- Adjust width percentage as needed -->
      </div>
    </li>
    </li>
    <!-- Add more skills here -->
  </ul>
</div>
`);
        },
        projects: () => {
            appendOutput("Showing my projects");
            createPopup("My Projects",
        `
        <div class="projects-popup">
            <ul>
        <li><b>Game-Rocket Car:</b> A game developed in Unity which can be played on all Windows devices. <a href="https://www.youtube.com/watch?v=gQt55cHJV5k" target="_blank">View</a></li>
        <li><b>Game-Baller-3D:</b> Baller 3D is a development-build game created using Unity. <a href="https://drive.google.com/drive/folders/1mZSmtIMe8XmL99R21g24NbrHEe64fnt4?usp=sharing" target="_blank">View</a></li>
        <li><b>Delta.co:</b> A practice website built for the Delta.co company. <a href="https://mrfiscus.github.io/project-1/" target="_blank">View</a></li>
        <li><b>Fiscus Films:</b> A movie streaming site design created by Fiscus. <a href="https://mrfiscus.github.io/Fiscusfilms/" target="_blank">View</a></li>
        
        <li><b>KMC Website:</b> A recreated website built during a 2-hour web design competition. <a href="https://vsn-final.netlify.app/" target="_blank">View</a></li>
        <li><b>Reck.co:</b> A recreated website built for practicing JavaScript. <a href="https://mrfiscus.github.io/project-2/" target="_blank">View</a></li>
        <li><b>Dice Game:</b> A fun dice game developed in JS. <a href="https://mrfiscus.github.io/Dice-Game/" target="_blank">View</a></li>
         <li><b>Biruwa:</b> A concept for plantation app that monitors your plants.<a href="https://mrfiscus.github.io/Biruwa/" target="_blank">View</a></li>
         <li><b>Windows Portfolio:</b> A windows 95 themed portfolio website.<a href="https://github.com/MrFiscus/Fiscus-95" target="_blank">View</a></li>
  
            </ul>
        </div>
        `
            );    
        },
        contact: () => {
            appendOutput("Showing my contact information");
            createPopup(  "Contact Me",
                `
                <div class="contact-popup">
                    <p><span class="label">Email:</span> <span class="value"><a href="mailto:contact@smaranpokharel.com.np" target="_blank">contact@smaranpokharel@gmail.com</a></span></p>
                    <p><span class="label">GitHub:</span> <a href="https://github.com/MrFiscus" target="_blank">github.com/MrFiscus</a></p>
                    <p><span class="label">Facebook:</span> <a href="https://www.facebook.com/smaranpokharel.21/" target="_blank">facebook.com/smaranpokharel.21</a></p>
                    <p><span class="label">Discord:</span> <span class="value">mrfiscus</span></p>
                    <p><span class="label">LinkedIn:</span> <a href="https://www.linkedin.com/in/smaran-pokharel-12a720305/" target="_blank">linkedin/smaranpokharel</a></p>
                    <p><span class="label">Twitter:</span> <a href="https://x.com/shehates_fiscus" target="_blank">twitter.com/SmaranIam</a></p>
                </div>
                `);
        },
        resume: () => {
            appendOutput("Showing my resume");
            createPopup(
                "My Resume",
                `
                <p>You can view my resume below:</p>
                <iframe src="resume.pdf" width="100%" height="500" style="border: none;"></iframe>
                <p><a href="resume.pdf" download="My_Resume.pdf" style="color: #10b981; font-size: 20px; font-weight: bolder; text-decoration: underline;">Download Resume</a></p>
                `
            );
        },
        clear: () => {
            location.reload(); 
        },
    };

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const command = input.value.trim();
            input.value = "";

            if (command in commands) {
                appendOutput(command);
                commands[command]();
            } else {
                appendOutput(`Unknown command: ${command}`);
            }
        }
    });

    function appendOutput(text) {
        const output = document.createElement("p");
        output.classList.add("output");
        output.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${text}`;
        outputArea.appendChild(output);
        const inputLine = document.querySelector(".input-line");
        outputArea.appendChild(inputLine);
        outputArea.scrollTop = outputArea.scrollHeight;
    }

    function appendWelcomeMessage() {
        const welcomeMessage = `
            <pre class="name">
█████ █   █  ███  ████   ███  █   █  ████   ███  █  █  █   █  ███  ████  █████ █     
█     ██ ██ █   █ █   █ █   █ ██  █  █   █ █   █ █ █   █   █ █   █ █   █ █     █    
█████ █ █ █ █████ ████  █████ █ █ █  ████  █   █ ██ █  █████ █████ ████  ████  █     
    █ █   █ █   █ █   █ █   █ █  ██  █     █   █ █  █  █   █ █   █ █   █ █     █    
█████ █   █ █   █ █   █ █   █ █   █  █      ███  █   █ █   █ █   █ █   █ █████ █████
</pre>

          
            <p class="output"><span class="arrows">>></span> Welcome to my <span class="green-text">portfolio </span>website. Type the available commands:</p>
            <p class="output"><span class="clickable-command" data-command="about"><b>about</b></span>: Information about me</p>
            <p class="output"><span class="clickable-command" data-command="skills"><b>skills</b></span>: Show my skills</p>
            <p class="output"><span class="clickable-command" data-command="projects"><b>projects</b></span>: Show my projects</p>
            <p class="output"><span class="clickable-command" data-command="contact"><b>contact</b></span>: My contact information</p>
            <p class="output"><span class="clickable-command" data-command="resume"><b>resume</b></span>: View and download my resume</p>
            <p class="output"><span class="clickable-command" data-command="clear"><b>clear</b></span>: Clear the terminal</p>
        `;
        outputArea.innerHTML = welcomeMessage;
        initializeClickableCommands(); // Reinitialize clickable commands
    }

    function createPopup(title, content) {
        const popup = document.createElement("div");
        popup.className = "draggable-popup";

        popup.innerHTML = `
            <div class="popup-header">
                <span>${title}</span>
                <div class="control-buttons">
                    <span class="button maximize"></span>
                    <span class="button minimize"></span>
                    <span class="button close"></span>
                </div>
            </div>
            <div class="popup-content">${content}</div>
        `;

        document.body.appendChild(popup);

        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        popup.querySelector(".popup-header").addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - popup.offsetLeft;
            offsetY = e.clientY - popup.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                popup.style.left = e.clientX - offsetX + "px";
                popup.style.top = e.clientY - offsetY + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        popup.querySelector(".maximize").addEventListener("click", () => {
            if (popup.classList.contains("maximized")) {
                popup.style.width = "400px";
                popup.style.height = "auto";
                popup.style.top = "50px";
                popup.style.left = "50px";
                popup.classList.remove("maximized");
            } else {
                popup.style.width = "80vw";
                popup.style.height = "80vh";
                popup.style.top = "10%";
                popup.style.left = "10%";
                popup.classList.add("maximized");
            }
        });

        popup.querySelector(".minimize").addEventListener("click", () => {
            popup.style.display = "none";
            const label = document.createElement("span");
            label.className = "minimized-label";
            label.textContent = title;
            label.addEventListener("click", () => {
                popup.style.display = "block";
                label.remove();
                addNewTabButton();
            });
            tabsContainer.insertBefore(label, tabsContainer.querySelector(".new-tab"));
        });

        popup.querySelector(".close").addEventListener("click", () => {
            popup.remove();
            addNewTabButton();
        });

        addNewTabButton();
    }

    function addNewTabButton() {
        let newTab = tabsContainer.querySelector(".new-tab");

        if (!newTab) {
            newTab = document.createElement("span");
            newTab.className = "tab new-tab";
            newTab.textContent = "+";
            newTab.addEventListener("click", () => {
                createPopup("New Popup", "Hello there! Welcome to smaranpokharel.com.np");
            });
            tabsContainer.appendChild(newTab);
        } else {
            newTab.remove();
            tabsContainer.appendChild(newTab);
        }
    }

    function initializeClickableCommands() {
        document.querySelectorAll(".clickable-command").forEach((el) => {
            el.addEventListener("click", () => {
                const command = el.dataset.command;
                if (commands[command]) {
                    appendOutput(command);
                    commands[command]();
                }
            });
        });
    }

    appendWelcomeMessage();
    addNewTabButton();
});
