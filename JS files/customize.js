// =============================
//  CUSTOMIZE.JS — 3-Step Commission Wizard
// =============================

let wizardState = {
    step: 1,
    artType: null,
    description: '',
    referenceImage: null,
    referencePreview: null,
    style: null,
    dimensions: '8000x6000',
    resolution: '300',
    deadline: 'standard',
    budget: 200
};

document.addEventListener('DOMContentLoaded', () => {
    const wizardContainer = document.getElementById('wizard-container');
    if (!wizardContainer) return;

    // Load draft
    const draft = localStorage.getItem('st_commission_draft');
    if (draft) {
        try {
            const parsed = JSON.parse(draft);
            Object.assign(wizardState, parsed);
            wizardState.referenceImage = null; // Don't persist file data
        } catch(e) {}
    }

    renderWizard();
});

function renderWizard() {
    const container = document.getElementById('wizard-container');
    if (!container) return;

    // Progress bar
    const progressPct = ((wizardState.step - 1) / 2) * 100;

    let stepsHTML = `
        <div class="wizard-progress" style="display:flex;justify-content:space-between;max-width:400px;margin:0 auto 40px;">
            <div class="wizard-progress-track"></div>
            <div class="wizard-progress-bar" style="width:${progressPct}%"></div>
            <div class="wizard-step-indicator ${wizardState.step >= 1 ? 'active' : ''} ${wizardState.step > 1 ? 'completed' : ''}">1</div>
            <div class="wizard-step-indicator ${wizardState.step >= 2 ? 'active' : ''} ${wizardState.step > 2 ? 'completed' : ''}">2</div>
            <div class="wizard-step-indicator ${wizardState.step >= 3 ? 'active' : ''}">3</div>
        </div>
    `;

    let contentHTML = '';

    if (wizardState.step === 1) {
        contentHTML = renderStep1();
    } else if (wizardState.step === 2) {
        contentHTML = renderStep2();
    } else if (wizardState.step === 3) {
        contentHTML = renderStep3();
    }

    container.innerHTML = stepsHTML + contentHTML;
    attachStepListeners();
}

function renderStep1() {
    const types = [
        { id: 'portrait', icon: 'fa-user', label: 'Portrait', desc: 'Digital character art' },
        { id: 'environment', icon: 'fa-mountain-sun', label: 'Environment', desc: 'Scenes & landscapes' },
        { id: 'cyberpunk', icon: 'fa-robot', label: 'Cyberpunk', desc: 'Neon-lit futurism' },
        { id: 'brand', icon: 'fa-palette', label: 'Brand Art', desc: 'Logo & identity' }
    ];

    const cards = types.map(t => `
        <div class="wizard-art-type ${wizardState.artType === t.id ? 'selected' : ''}" data-type="${t.id}">
            <i class="fa-solid ${t.icon}"></i>
            <h4 style="margin:0 0 5px;font-size:16px;">${t.label}</h4>
            <p style="color:var(--text-muted);font-size:12px;margin:0;">${t.desc}</p>
        </div>
    `).join('');

    return `
        <h2 style="text-align:center;margin-bottom:10px;">Choose Your <span class="text-gradient">Canvas</span></h2>
        <p style="text-align:center;color:var(--text-muted);margin-bottom:30px;">What type of artwork would you like commissioned?</p>
        <div class="wizard-step-grid">${cards}</div>
        <div style="text-align:center;margin-top:30px;">
            <button class="btn-pro btn-glow" id="step1Next" style="padding:15px 40px;" ${!wizardState.artType ? 'disabled style="opacity:0.5;padding:15px 40px;"' : ''}>
                Next Step <i class="fa-solid fa-arrow-right" style="margin-left:8px;"></i>
            </button>
        </div>
    `;
}

function renderStep2() {
    const styles = ['Cyberpunk', 'Anime', 'Realistic', 'Abstract', 'Minimalist', 'Retro'];
    const styleOptions = styles.map(s => `
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px;border-radius:8px;border:1px solid ${wizardState.style === s ? 'var(--primary)' : 'var(--border-light)'};background:${wizardState.style === s ? 'rgba(139,92,246,0.1)' : 'transparent'};transition:0.3s;">
            <input type="radio" name="artStyle" value="${s}" ${wizardState.style === s ? 'checked' : ''} style="accent-color:var(--primary);">
            <span>${s}</span>
        </label>
    `).join('');

    const previewHTML = wizardState.referencePreview
        ? `<img src="${wizardState.referencePreview}" style="max-width:200px;max-height:150px;border-radius:12px;margin-top:10px;border:2px solid var(--primary);">`
        : '';

    return `
        <h2 style="text-align:center;margin-bottom:10px;">Tell Your <span class="text-gradient">Vision</span></h2>
        <p style="text-align:center;color:var(--text-muted);margin-bottom:30px;">Describe what you want and upload reference images.</p>
        
        <div style="max-width:600px;margin:auto;">
            <div style="margin-bottom:25px;">
                <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Description</label>
                <textarea class="pro-input pro-textarea" id="wizardDesc" placeholder="Describe the mood, colors, characters, and setting you envision...">${wizardState.description}</textarea>
            </div>

            <div style="margin-bottom:25px;">
                <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Reference Image (Optional)</label>
                <input type="file" id="wizardFile" accept="image/*" class="pro-input" style="padding:12px;">
                ${previewHTML}
            </div>

            <div style="margin-bottom:25px;">
                <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Art Style</label>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">${styleOptions}</div>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;max-width:600px;margin:30px auto 0;">
            <button class="btn-pro btn-outline" onclick="goToStep(1)" style="padding:15px 30px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:8px;"></i> Back
            </button>
            <button class="btn-pro btn-glow" id="step2Next" style="padding:15px 40px;">
                Next Step <i class="fa-solid fa-arrow-right" style="margin-left:8px;"></i>
            </button>
        </div>
    `;
}

function renderStep3() {
    const deadlineLabels = { rush: 'Rush (2-3 days) +50%', standard: 'Standard (5-7 days)', relaxed: 'Relaxed (10-14 days) -15%' };

    return `
        <h2 style="text-align:center;margin-bottom:10px;">Set Your <span class="text-gradient">Details</span></h2>
        <p style="text-align:center;color:var(--text-muted);margin-bottom:30px;">Final specifications for your commission.</p>
        
        <div style="max-width:600px;margin:auto;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                <div>
                    <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Dimensions</label>
                    <select class="pro-input" id="wizardDim">
                        <option value="8000x6000" ${wizardState.dimensions === '8000x6000' ? 'selected' : ''}>8000×6000 (8K)</option>
                        <option value="4000x3000" ${wizardState.dimensions === '4000x3000' ? 'selected' : ''}>4000×3000 (4K)</option>
                        <option value="2000x1500" ${wizardState.dimensions === '2000x1500' ? 'selected' : ''}>2000×1500 (2K)</option>
                    </select>
                </div>
                <div>
                    <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Resolution</label>
                    <select class="pro-input" id="wizardRes">
                        <option value="300" ${wizardState.resolution === '300' ? 'selected' : ''}>300 DPI (Print)</option>
                        <option value="150" ${wizardState.resolution === '150' ? 'selected' : ''}>150 DPI (Digital)</option>
                        <option value="72" ${wizardState.resolution === '72' ? 'selected' : ''}>72 DPI (Web)</option>
                    </select>
                </div>
            </div>

            <div style="margin-bottom:25px;">
                <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Deadline</label>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${Object.entries(deadlineLabels).map(([key, label]) => `
                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:12px;border-radius:8px;border:1px solid ${wizardState.deadline === key ? 'var(--primary)' : 'var(--border-light)'};background:${wizardState.deadline === key ? 'rgba(139,92,246,0.1)' : 'transparent'};">
                            <input type="radio" name="deadline" value="${key}" ${wizardState.deadline === key ? 'checked' : ''} style="accent-color:var(--primary);">
                            <span>${label}</span>
                        </label>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom:25px;">
                <label style="display:block;margin-bottom:10px;color:var(--text-light);font-weight:bold;">Budget: <span id="budgetDisplay" style="color:var(--primary);">$${wizardState.budget}</span></label>
                <input type="range" id="wizardBudget" min="50" max="1000" step="25" value="${wizardState.budget}" style="width:100%;accent-color:var(--primary);">
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-top:5px;">
                    <span>$50</span><span>$1000</span>
                </div>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;max-width:600px;margin:30px auto 0;">
            <button class="btn-pro btn-outline" onclick="goToStep(2)" style="padding:15px 30px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:8px;"></i> Back
            </button>
            <button class="btn-pro btn-glow" id="submitCommission" style="padding:15px 40px;">
                <i class="fa-solid fa-paper-plane" style="margin-right:8px;"></i> Submit Commission
            </button>
        </div>
    `;
}

function attachStepListeners() {
    // Step 1: Art type selection
    document.querySelectorAll('.wizard-art-type').forEach(card => {
        card.addEventListener('click', () => {
            wizardState.artType = card.dataset.type;
            saveDraft();
            renderWizard();
        });
    });

    // Step 1: Next
    const step1Next = document.getElementById('step1Next');
    if (step1Next) {
        step1Next.addEventListener('click', () => {
            if (wizardState.artType) goToStep(2);
        });
    }

    // Step 2: Description
    const descField = document.getElementById('wizardDesc');
    if (descField) {
        descField.addEventListener('input', () => {
            wizardState.description = descField.value;
            saveDraft();
        });
    }

    // Step 2: File upload
    const fileInput = document.getElementById('wizardFile');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    wizardState.referencePreview = ev.target.result;
                    renderWizard();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Step 2: Style radios
    document.querySelectorAll('input[name="artStyle"]').forEach(radio => {
        radio.addEventListener('change', () => {
            wizardState.style = radio.value;
            saveDraft();
            renderWizard();
        });
    });

    // Step 2: Next
    const step2Next = document.getElementById('step2Next');
    if (step2Next) {
        step2Next.addEventListener('click', () => goToStep(3));
    }

    // Step 3: Selects
    const dimSelect = document.getElementById('wizardDim');
    if (dimSelect) dimSelect.addEventListener('change', () => { wizardState.dimensions = dimSelect.value; saveDraft(); });

    const resSelect = document.getElementById('wizardRes');
    if (resSelect) resSelect.addEventListener('change', () => { wizardState.resolution = resSelect.value; saveDraft(); });

    // Step 3: Deadline
    document.querySelectorAll('input[name="deadline"]').forEach(radio => {
        radio.addEventListener('change', () => {
            wizardState.deadline = radio.value;
            saveDraft();
            renderWizard();
        });
    });

    // Step 3: Budget
    const budgetSlider = document.getElementById('wizardBudget');
    const budgetDisplay = document.getElementById('budgetDisplay');
    if (budgetSlider) {
        budgetSlider.addEventListener('input', () => {
            wizardState.budget = parseInt(budgetSlider.value);
            if (budgetDisplay) budgetDisplay.textContent = '$' + wizardState.budget;
            saveDraft();
        });
    }

    // Step 3: Submit
    const submitBtn = document.getElementById('submitCommission');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitCommission);
    }
}

window.goToStep = function(n) {
    wizardState.step = n;
    saveDraft();
    renderWizard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function saveDraft() {
    const toSave = { ...wizardState };
    delete toSave.referencePreview; // Don't save large base64
    localStorage.setItem('st_commission_draft', JSON.stringify(toSave));
}

function submitCommission() {
    if (!wizardState.artType) {
        if (typeof showToast === 'function') showToast('Please select an art type', 'error');
        return;
    }

    const container = document.getElementById('wizard-container');
    container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">
            <div style="width:80px;height:80px;border-radius:50%;background:rgba(16,185,129,0.1);border:2px solid var(--accent);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
                <i class="fa-solid fa-check" style="font-size:36px;color:var(--accent);"></i>
            </div>
            <h2 style="font-size:32px;margin-bottom:10px;">Commission <span class="text-gradient">Submitted!</span></h2>
            <p style="color:var(--text-muted);margin-bottom:30px;max-width:500px;margin-left:auto;margin-right:auto;">
                Your ${wizardState.artType} commission request has been received. Our artists will review your brief and reply within 24 hours.
            </p>
            <div class="pro-card" style="max-width:400px;margin:0 auto 30px;text-align:left;padding:25px;">
                <h4 style="margin-bottom:15px;color:var(--primary);">Commission Summary</h4>
                <p style="margin:8px 0;color:var(--text-muted);font-size:14px;"><strong style="color:#fff;">Type:</strong> ${wizardState.artType}</p>
                <p style="margin:8px 0;color:var(--text-muted);font-size:14px;"><strong style="color:#fff;">Style:</strong> ${wizardState.style || 'Not specified'}</p>
                <p style="margin:8px 0;color:var(--text-muted);font-size:14px;"><strong style="color:#fff;">Resolution:</strong> ${wizardState.dimensions} @ ${wizardState.resolution} DPI</p>
                <p style="margin:8px 0;color:var(--text-muted);font-size:14px;"><strong style="color:#fff;">Deadline:</strong> ${wizardState.deadline}</p>
                <p style="margin:8px 0;color:var(--text-muted);font-size:14px;"><strong style="color:#fff;">Budget:</strong> $${wizardState.budget}</p>
            </div>
            <a href="index.html" class="btn-pro btn-glow" style="padding:15px 40px;">Back to Home</a>
        </div>
    `;

    localStorage.removeItem('st_commission_draft');
    if (typeof showToast === 'function') showToast('Commission submitted successfully!', 'success');
}
