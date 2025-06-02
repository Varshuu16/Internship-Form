function generateCertificate() {
    const name = document.getElementById('name').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const gender = document.getElementById('gender').value;

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const startDate = new Date(document.getElementById('start').value)
    .toLocaleDateString('en-US', options)
    .replace(',', ''); 

const endDate = new Date(document.getElementById('end').value)
    .toLocaleDateString('en-US', options)
    .replace(',', '');

document.getElementById('cert-start').textContent = startDate;
document.getElementById('cert-end').textContent = endDate;

const dateStr = new Date(document.getElementById('date').value)
    .toLocaleDateString('en-US', options)
    .replace(',', ',');

    document.getElementById('cert-date').innerText = dateStr;


    const domainInputs = document.querySelectorAll('input[name="domain"]');
    const proficiencySelects = document.querySelectorAll('select[name="proficiency"]');

    const domainElements = [];

    for (let i = 0; i < domainInputs.length; i++) {
        const domain = domainInputs[i].value;
        const proficiency = proficiencySelects[i].value;

        let color;
        switch (proficiency) {
            case 'fundamental': color = '#d35400'; break;
            case 'working': color = 'blue'; break;
            case 'professional': color = 'green'; break;
            default: color = 'black';
        }

        domainElements.push(`<span style="color: ${color}; font-weight: bold;">${domain}</span>`);
    }

    const allDomainsHTML = domainElements.join(', ');
    document.getElementById('cert-domains-list').innerHTML = allDomainsHTML;

    document.getElementById('cert-start').innerText = startDate;
    document.getElementById('cert-end').innerText = endDate;

    

    const pronoun = gender === 'male' ? 'him' : 'her';
    const pronoun2 = gender === 'male' ? 'his' : 'her';
    const pronoun3 = gender === 'male' ? 'he' : 'she';
    const title = gender === "male" ? "Mr." : "Ms.";
    document.getElementById('cert-pronoun').innerText = pronoun;
    document.getElementById('cert-pronoun2').innerText = pronoun;
    document.getElementById('cert-pronoun3').innerText = pronoun3;
    document.getElementById('cert-pronoun4').innerText = pronoun;
    document.getElementById('cert-pronoun5').innerText = pronoun2;
    document.getElementById("cert-name").textContent = `${title} ${name}`;

    const certElement = document.getElementById('certificate');
    certElement.style.display = 'block';

   html2canvas(certElement, {
  scale: 2,       // boosts resolution
  width: 794,     // enforce A4 width
  height: 1123    // enforce A4 height
}).then(canvas => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = image;
  link.download = `${name}_certificate.png`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  certElement.style.display = 'none';
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
