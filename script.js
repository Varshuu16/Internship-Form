function generateCertificate() {
    const name = document.getElementById("name").value;
    const start = new Date(document.getElementById("start").value);
    const end = new Date(document.getElementById("end").value);
    const gender = document.getElementById("gender").value;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedStart = start.toLocaleDateString("en-US", options);
    const formattedEnd = end.toLocaleDateString("en-US", options);
    const today = new Date().toLocaleDateString("en-US", options);

    const domainInputs = document.querySelectorAll('input[name="domain"]');
    const proficiencyInputs = document.querySelectorAll('select[name="proficiency"]');

    let domainList = [];
    for (let i = 0; i < domainInputs.length; i++) {
        const domain = domainInputs[i].value.trim();
        const proficiency = proficiencyInputs[i].value.trim();

        if (domain && proficiency) {
            domainList.push(`${domain} (${proficiency.charAt(0).toUpperCase() + proficiency.slice(1)} Proficiency)`);
        }
    }

    const domainListText = domainList.join(", ");

    const pronoun = gender === "male" ? "him" : "her";
    const pronoun2 = gender === "male" ? "his" : "her";
    const title = gender === "male" ? "Mr." : "Ms.";

    document.getElementById("cert-date").textContent = today;
    document.getElementById("cert-name").textContent = `${title} ${name}`;
    document.getElementById("cert-domains-list").textContent = domainListText;
    document.getElementById("cert-start").textContent = formattedStart;
    document.getElementById("cert-end").textContent = formattedEnd;
    document.getElementById("cert-description").textContent =
        `We found ${pronoun} to be sincere, hardworking, dedicated and result-oriented, while working well as a part of the team. We take this opportunity to congratulate ${pronoun} for completing the internship.`;
    document.getElementById("cert-pronoun").textContent = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    document.getElementById("cert-pronoun2").textContent = pronoun2;

    const certificate = document.getElementById("certificate");
    certificate.style.display = "block";

    const opt = {
        filename:     `${name}-Internship-Certificate.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(certificate).save().then(() => {
        certificate.style.display = "none";
    });
}

function addDomainField() {
    const container = document.getElementById('user-details');

    const domainBox = document.createElement('div');
    domainBox.className = 'input-box';
    domainBox.innerHTML = `
        <span class="details">Domain</span>
        <input type="text" name="domain" placeholder="Enter domain" required>
    `;

    const proficiencyBox = document.createElement('div');
    proficiencyBox.className = 'input-box';
    proficiencyBox.innerHTML = `
        <span class="details">Proficiency</span>
        <select name="proficiency" required>
            <option value="" disabled selected>Select</option>
            <option value="fundamental">Fundamental Understanding</option>
            <option value="working">Working Proficiency</option>
            <option value="professional">Professional Proficiency</option>
        </select>
    `;

    container.appendChild(domainBox);
    container.appendChild(proficiencyBox);
}
