document.addEventListener('DOMContentLoaded', () => {
    // Add this helper function at the start of your script
    function getElement(selector, context = document) {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    }

    // Use it for critical elements
    const fetchButton = getElement('#fetchButton');
    const resultsContainer = getElement('#results');
    const actionButtons = getElement('#action-buttons');
    const printButton = getElement('#printButton');
    const snapshotButton = getElement('#snapshotButton');
    const formInstructions = getElement('#form-instructions');

    // Get all DOM elements
    const semesterSelect = document.getElementById('semester');
    const batchSelect = document.getElementById('batch');
    const messageDiv = document.getElementById('message');
    const regNoInput = document.getElementById('regNo');

    // Add print functionality
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Function to check if form has valid inputs
    function checkValidInputs() {
        const semesterValue = semesterSelect.value.trim();
        const batchValue = batchSelect.value.trim();
        const regNoValue = regNoInput.value.trim();
        
        // If all fields have valid values
        if (semesterValue && batchValue && regNoValue.length === 11 && !isNaN(regNoValue)) {
            // Hide instructions
            if (formInstructions) {
                formInstructions.style.display = 'none';
            }
            return true;
        } else {
            // Show instructions
            if (formInstructions) {
                formInstructions.style.display = 'block';
            }
            return false;
        }
    }

    // Add event listeners to form fields to check validity
    semesterSelect.addEventListener('change', checkValidInputs);
    batchSelect.addEventListener('change', checkValidInputs);
    regNoInput.addEventListener('input', checkValidInputs);

    // Define semester to batch mapping
    const semesterToBatchMapping = {
        '1st': ['2023', '2022'],
        '2nd': ['2024', '2023'],
        '3rd': ['2023'],
        '4th': ['2023', '2022'],
        '5th': ['2023', '2022'],
        '6th': ['2024', '2023'],
        '7th': ['2023', '2022'],
        '8th': ['2024', '2023']
    };

    // Handle semester selection change
    semesterSelect.addEventListener('change', () => {
        const selectedSemester = semesterSelect.value;
        const availableBatches = semesterToBatchMapping[selectedSemester];

        batchSelect.innerHTML = '<option value="" disabled selected>Select Examination Year</option>';
        messageDiv.textContent = '';

        if (availableBatches) {
            availableBatches.forEach(batch => {
                const option = document.createElement('option');
                option.value = batch;
                option.textContent = `${batch} Examination Year`;
                batchSelect.appendChild(option);
            });
            batchSelect.disabled = false;
            
            // Show examination year selection message immediately after semester is selected
            messageDiv.innerHTML = `
                <div style="color: #856404; background: #fff3cd; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba;">
                    Please select examination year
                </div>`;
            batchSelect.focus();
        } else {
            batchSelect.disabled = true;
        }
        
        // Check if form is valid
        checkValidInputs();
    });

    // Handle batch selection change
    batchSelect.addEventListener('change', () => {
        messageDiv.textContent = '';
        
        // If registration number is empty, show registration input message
        if (!regNoInput.value) {
            messageDiv.innerHTML = `
                <div style="color: #856404; background: #fff3cd; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba;">
                    Please enter a valid 11-digit registration number
                </div>`;
            regNoInput.focus();
        }
        // If registration number is complete, show message to click the 'Get Result' button
        else if (regNoInput.value.length === 11) {
            messageDiv.innerHTML = `
                <div style="color: #004085; background: #cce5ff; padding: 10px; border-radius: 4px; border: 1px solid #b8daff; text-align: center;">
                    Click the 'Get Result' button to view your results
                </div>`;
            fetchButton.focus();
        }
        
        // Check if form is valid
        checkValidInputs();
    });

    // Function to get failed subjects
    function getFailedSubjects(entry) {
        const failedSubjects = [];
        
        if (entry.theory_subjects) {
            entry.theory_subjects.forEach(subject => {
                if (subject.grade === 'F') {
                    failedSubjects.push({
                        code: subject.subject_code,
                        name: subject.subject_name,
                        type: 'Theory'
                    });
                }
            });
        }
        
        if (entry.practical_subjects) {
            entry.practical_subjects.forEach(subject => {
                if (subject.grade === 'F') {
                    failedSubjects.push({
                        code: subject.subject_code,
                        name: subject.subject_name,
                        type: 'Practical'
                    });
                }
            });
        }
        
        return failedSubjects;
    }

    // Function to format marks table
    function formatMarksTable(subjects, type) {
        if (!subjects || subjects.length === 0) return '';
        
        return `
            <h3 class="table-type-title">${type} Subjects</h3>
            <table class="marks-table">
                <thead>
                    <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>ESE</th>
                        <th>IA</th>
                        <th>Total</th>
                        <th>Grade</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    ${subjects.map(subject => `
                        <tr>
                            <td>${subject.subject_code}</td>
                            <td class="subject-name">${subject.subject_name}</td>
                            <td>${subject.ese || '-'}</td>
                            <td>${subject.ia || '-'}</td>
                            <td>${subject.total || '0'}</td>
                            <td class="${subject.grade === 'F' ? 'failed-grade' : ''}">${subject.grade}</td>
                            <td>${subject.credit}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Function to format failed subjects display
    function formatFailedSubjects(failedSubjects) {
        if (failedSubjects.length === 0) {
            return '<div class="pass-status">PASS</div>';
        }

        // Split subjects into rows of max 4
        const rows = [];
        for (let i = 0; i < failedSubjects.length; i += 4) {
            rows.push(failedSubjects.slice(i, i + 4));
        }

        return `
            <div style="color: #c62828; font-weight: bold; margin-bottom: 5px; text-align: center;">
                Remarks: You are failed in these subject(s)
            </div>
            ${rows.map(row => `
                <div class="failed-subject-row">
                    ${row.map(subject => `
                        <div class="failed-subject">
                            ${subject.name} (${subject.type})
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        `;
    }

    // Function for taking a snapshot of the result and saving it
    function takeSnapshot() {
        // Show a loading message
        messageDiv.innerHTML = `
            <div class="message success">
                Generating snapshot... Please wait.
            </div>
        `;

        // Make watermark more visible for snapshots
        const watermarks = document.querySelectorAll('.watermark-disclaimer');
        watermarks.forEach(watermark => {
            watermark.style.color = 'rgba(220, 53, 69, 0.15)';
            watermark.style.fontSize = '48px';
            if (watermark.nextElementSibling) {
                watermark.nextElementSibling.style.color = 'rgba(220, 53, 69, 0.15)';
                watermark.nextElementSibling.style.fontSize = '40px';
            }
        });

        // Scroll to top of the results container to ensure all content is visible
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        // Use a timeout to ensure the page has scrolled before taking the screenshot
        setTimeout(() => {
            html2canvas(resultsContainer, {
                scale: 2, // Increase quality
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                // Convert canvas to an image
                const image = canvas.toDataURL('image/png');
                
                // Create a temporary link to download the image
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const semester = semesterSelect.value;
                const regNo = regNoInput.value;
                
                // Format the filename with registration number and semester
                link.download = `result_${regNo}_${semester}_${timestamp}.png`;
                link.href = image;
                link.click();
                
                // Reset watermark visibility
                watermarks.forEach(watermark => {
                    watermark.style.color = 'rgba(220, 53, 69, 0.07)';
                    watermark.style.fontSize = '42px';
                    if (watermark.nextElementSibling) {
                        watermark.nextElementSibling.style.color = 'rgba(220, 53, 69, 0.07)';
                        watermark.nextElementSibling.style.fontSize = '36px';
                    }
                });
                
                // Show success message
                messageDiv.innerHTML = `
                    <div class="message success">
                        Snapshot saved to your device!
                    </div>
                `;
            }).catch(err => {
                console.error('Error generating snapshot:', err);
                messageDiv.innerHTML = `
                    <div class="message error">
                        Failed to generate snapshot. Please try again.
                    </div>
                `;
                
                // Reset watermark visibility on error
                watermarks.forEach(watermark => {
                    watermark.style.color = 'rgba(220, 53, 69, 0.07)';
                    watermark.style.fontSize = '42px';
                    if (watermark.nextElementSibling) {
                        watermark.nextElementSibling.style.color = 'rgba(220, 53, 69, 0.07)';
                        watermark.nextElementSibling.style.fontSize = '36px';
                    }
                });
            });
        }, 500);
    }

    // Add event listener for snapshot button
    if (snapshotButton) {
        snapshotButton.addEventListener('click', takeSnapshot);
    }

    // Function to display results
    function displayResult(data) {
        resultsContainer.innerHTML = '';
        
        data.forEach((entry) => {
            if (!entry.separator) {
                const failedSubjects = getFailedSubjects(entry);
                const cgpa = entry.semester_grades.find(g => g.semester === 'Cur. CGPA')?.sgpa || 'NA';
                
                const resultHTML = `
                    <div class="result-page">
                        <div class="university-header">
                            <h1>BIHAR ENGINEERING UNIVERSITY, PATNA</h1>
                            <div class="semester-header">
                                ${entry.exam_name}
                            </div>
                        </div>

                        <div class="result-card">
                            <!-- Watermark disclaimer -->
                            <div class="watermark-disclaimer">UNOFFICIAL RESULT - NOT FOR OFFICIAL USE</div>
                            
                            <div class="student-info-section">
                        <table class="student-info">
                            <tr>
                                        <th>Registration No</th>
                                        <td>${entry.registration_no}</td>
                                        <th>Semester</th>
                                        <td>${entry.semester}</td>
                            </tr>
                            <tr>
                                        <th>Student Name</th>
                                        <td colspan="3">${entry.student_name}</td>
                            </tr>
                            <tr>
                                        <th>Course</th>
                                        <td colspan="3">${entry.course_name}</td>
                            </tr>
                            <tr>
                                        <th>College</th>
                                        <td colspan="3">${entry.college_name}</td>
                            </tr>
                        </table>
                            </div>

                            <div class="result-summary">
                                <div class="summary-card">
                                    <div class="summary-title">SEMESTER GPA</div>
                                    <div class="summary-value">${entry.sgpa || '0.00'}</div>
                                </div>
                                <div class="summary-card">
                                    <div class="summary-title">CUMULATIVE GPA</div>
                                    <div class="summary-value">${cgpa}</div>
                                </div>
                                <div class="summary-card">
                                    <div class="summary-title">PUBLISH DATE</div>
                                    <div class="summary-value small">${entry.publish_date || 'N/A'}</div>
                                </div>
                            </div>

                        <div class="marks-section">
                                <div class="section-title">Performance Details</div>
                            ${formatMarksTable(entry.theory_subjects, 'Theory')}
                            ${formatMarksTable(entry.practical_subjects, 'Practical')}
                        </div>

                            <div class="cgpa-section">
                                <div class="section-title">Semester-wise Performance</div>
                                <div class="semester-grade-wrapper">
                        <table class="semester-grade-table">
                            <tr>
                                            <th>Semester</th>
                                            <th>I</th>
                                            <th>II</th>
                                            <th>III</th>
                                            <th>IV</th>
                                            <th>V</th>
                                            <th>VI</th>
                                            <th>VII</th>
                                            <th>VIII</th>
                                            <th>CGPA</th>
                            </tr>
                            <tr>
                                            <td>Grade</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'I')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'II')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'III')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'IV')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'V')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'VI')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'VII')?.sgpa || 'NA'}</td>
                                            <td>${entry.semester_grades.find(g => g.semester === 'VIII')?.sgpa || 'NA'}</td>
                                            <td>${cgpa}</td>
                            </tr>
                        </table>
                                </div>
                            </div>

                            ${failedSubjects.length > 0 ? `
                                <div class="remarks-section">
                                    <div class="section-title failed-title">Failed Subjects</div>
                                    <div class="remarks-content">
                                        ${formatFailedSubjects(failedSubjects)}
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <div class="disclaimer">
                            DISCLAIMER: This result is for information purposes only and should not be used for official purposes.
                        </div>
                    </div>
                `;

                resultsContainer.innerHTML += resultHTML;
            }
        });

        // Add custom styles for the enhanced result display
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .result-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                overflow: hidden;
                margin-bottom: 30px;
                border: 1px solid #e9ecef;
                position: relative;
            }
            
            /* Watermark disclaimer styling */
            .watermark-disclaimer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 42px;
                font-weight: 700;
                color: rgba(220, 53, 69, 0.07);
                pointer-events: none;
                transform: rotate(-30deg);
                z-index: 10;
                letter-spacing: 1px;
                text-align: center;
            }
            
            /* Additional watermark to ensure visibility */
            .watermark-disclaimer::after {
                content: 'FOR INFORMATION ONLY';
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                font-size: 36px;
                transform: translateY(70px) rotate(0deg);
                color: rgba(220, 53, 69, 0.07);
            }
            
            /* Make sure watermark is visible in print and snapshot */
            @media print {
                .watermark-disclaimer {
                    color: rgba(220, 53, 69, 0.15) !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                .watermark-disclaimer::after {
                    color: rgba(220, 53, 69, 0.15) !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
            
            .university-header {
                background: linear-gradient(135deg, #3a56d4, #6e8afb);
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
                position: relative;
                z-index: 15;
            }
            
            .university-header h1 {
                font-size: 22px;
                font-weight: 700;
                margin: 0 0 5px 0;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                color: white;
            }
            
            .semester-header {
                font-size: 16px;
                font-weight: 500;
                opacity: 0.9;
                color: white;
            }
            
            .student-info-section {
                padding: 20px;
            }
            
            .student-info {
                width: 100%;
                border-collapse: collapse;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            
            .student-info th, .student-info td {
                padding: 10px 15px;
                border: 1px solid #e2e8f0;
            }
            
            .student-info th {
                background: #f8fafc;
                font-weight: 600;
                color: #4a5568;
                width: 150px;
                text-align: left;
                white-space: nowrap;
            }
            
            .student-info td {
                font-weight: 500;
                color: #2d3748;
            }
            
            .result-summary {
                display: flex;
                gap: 15px;
                margin: 0 20px 20px 20px;
                flex-wrap: wrap;
            }
            
            .summary-card {
                flex: 1;
                background: #f8fafc;
                border-radius: 6px;
                padding: 12px 15px;
                text-align: center;
                border: 1px solid #e2e8f0;
                min-width: 120px;
            }
            
            .summary-title {
                font-size: 13px;
                color: #718096;
                font-weight: 600;
                margin-bottom: 8px;
                letter-spacing: 0.5px;
            }
            
            .summary-value {
                font-size: 24px;
                font-weight: 700;
                color: #3a56d4;
            }
            
            .summary-value.small {
                font-size: 16px;
            }
            
            .section-title {
                font-size: 18px;
                font-weight: 600;
                color: #4a5568;
                margin: 20px 20px 15px 20px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .failed-title {
                color: #e74c3c;
            }
            
            .marks-section, .cgpa-section {
                margin-bottom: 20px;
            }
            
            .marks-table {
                margin: 0 20px 20px 20px;
                width: calc(100% - 40px);
                border-collapse: collapse;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            
            .marks-table th {
                background: #f1f5f9;
                padding: 12px 15px;
                font-weight: 600;
                color: #4a5568;
                border: 1px solid #e2e8f0;
                text-align: left;
            }
            
            .marks-table td {
                padding: 10px 15px;
                border: 1px solid #e2e8f0;
                font-weight: 500;
            }
            
            .marks-table tr:last-child td {
                border-bottom: 1px solid #e2e8f0;
            }
            
            .marks-table tr:nth-child(even) {
                background-color: #f8fafc;
            }
            
            .marks-table tr:hover {
                background-color: #f1f5f9;
            }
            
            .marks-table td.failed-grade {
                color: #e74c3c;
                font-weight: bold;
            }
            
            .semester-grade-table {
                margin: 0 20px 20px 20px;
                width: calc(100% - 40px);
                border-collapse: collapse;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            
            .semester-grade-table th, .semester-grade-table td {
                padding: 10px 8px;
                text-align: center;
                border: 1px solid #e2e8f0;
                font-size: 14px;
                font-weight: 500;
            }
            
            .semester-grade-table th {
                background: #f1f5f9;
                font-weight: 600;
                color: #4a5568;
            }
            
            .semester-grade-table tr:nth-child(even) {
                background-color: #f8fafc;
            }
            
            .remarks-section {
                margin: 0 20px 20px 20px;
                background: #fff5f5;
                border-radius: 8px;
                padding: 0 0 15px 0;
                border: 1px solid #ffcdd2;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            
            .remarks-content {
                padding: 0 15px;
            }
            
            .table-type-title {
                font-size: 16px;
                font-weight: 600;
                margin: 20px 20px 10px 20px;
                color: #4a5568;
                padding-bottom: 5px;
                border-bottom: 1px solid #e2e8f0;
            }

            .disclaimer {
                background: #fff6e5;
                color: #b45309;
                text-align: center;
                padding: 12px;
                font-size: 14px;
                font-weight: 600;
                border-top: 1px solid #fed7aa;
                margin-top: 15px;
            }
            
            .failed-subject-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                margin-bottom: 10px;
            }
            
            .failed-subject {
                background: #fee2e2;
                color: #b91c1c;
                padding: 8px 12px;
                border-radius: 6px;
                font-weight: 500;
                flex: 1;
                min-width: 200px;
                max-width: 300px;
                text-align: center;
                border: 1px solid #fecaca;
            }
            
            /* Semester Grade Table wrapper for horizontal scroll */
            .semester-grade-wrapper {
                overflow-x: auto;
                width: 100%;
                margin: 0 auto;
            }
            
            /* Responsive styles for mobile devices */
            @media (max-width: 768px) {
                .university-header h1 {
                    font-size: 18px;
                }
                
                .semester-header {
                    font-size: 14px;
                }
                
                .student-info th, .student-info td {
                    padding: 8px 10px;
                    font-size: 14px;
                }
                
                .student-info th {
                    width: auto;
                }
                
                /* Reduce top margin for result display */
                .result-page {
                    margin-top: 10px;
                }
                
                .result-card {
                    margin-bottom: 20px;
                }
                
                .university-header {
                    padding: 15px;
                }
                
                .result-summary {
                    flex-direction: column;
                    gap: 8px;
                    margin: 0 15px 15px 15px;
                }
                
                .summary-card {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: 100%;
                    min-width: 100%;
                    margin-bottom: 0;
                    padding: 10px 15px;
                    text-align: left;
                    align-items: center;
                }
                
                .summary-title {
                    margin-bottom: 0;
                    text-align: left;
                    font-size: 14px;
                }
                
                .summary-value {
                    text-align: right;
                    font-size: 18px;
                }
                
                .summary-value.small {
                    font-size: 16px;
                    word-break: break-all;
                }
                
                .marks-table, .semester-grade-table {
                    font-size: 13px;
                    margin: 0 10px 15px 10px;
                    width: calc(100% - 20px);
                }
                
                .marks-table th, .marks-table td, 
                .semester-grade-table th, .semester-grade-table td {
                    padding: 8px 5px;
                }
                
                .subject-name {
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .semester-grade-table {
                    min-width: 650px; /* Ensure minimum width to display all columns */
                    overflow-x: visible;
                    display: table;
                }
                
                .semester-grade-wrapper {
                    overflow-x: auto;
                    margin: 0 10px 15px 10px;
                    width: calc(100% - 20px);
                }
                
                .section-title, .table-type-title {
                    margin: 15px 10px 10px 10px;
                    font-size: 16px;
                }
                
                .failed-subject-row {
                    flex-direction: column;
                }
                
                .failed-subject {
                    margin: 5px 0;
                }
                
                /* Tooltip adjustments for mobile */
                .reg-tooltip {
                    width: 90%;
                    max-width: 320px;
                    font-size: 13px;
                    padding: 15px;
                }
            }
            
            /* Extra small devices */
            @media (max-width: 480px) {
                .university-header h1 {
                    font-size: 16px;
                }
                
                .semester-header {
                    font-size: 13px;
                }
                
                .student-info-section {
                    padding: 10px;
                }
                
                /* Further reduce margin and padding for extra small devices */
                .result-page {
                    margin-top: 5px;
                }
                
                .university-header {
                    padding: 12px 10px;
                    border-radius: 8px 8px 0 0;
                }
                
                .result-card {
                    margin-bottom: 15px;
                    border-radius: 8px;
                }
                
                .marks-table, .semester-grade-table {
                    font-size: 12px;
                }
                
                /* Message div for notifications */
                #message {
                    font-size: 13px;
                }
                
                #message div {
                    padding: 8px;
                }
                
                #message ol {
                    margin-left: 10px;
                    padding-left: 10px;
                }
                
                .result-summary {
                    padding: 0;
                    margin: 0 8px 12px 8px;
                }
                
                .summary-card {
                    padding: 8px 10px;
                    background: #f8fafc;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    border-radius: 5px;
                    margin-bottom: 6px;
                }
                
                .summary-title {
                    font-size: 12px;
                    color: #4a5568;
                    font-weight: 600;
                }
                
                .summary-value {
                    font-size: 15px;
                }
                
                .summary-value.small {
                    font-size: 13px;
                }
            }
            
            /* Print styles - hide certain elements when printing */
            @media print {
                #controls, #message, .watermark, #fetchButton, #regNoHelp {
                    display: none !important;
                }
                
                body {
                    background: white;
                }
                
                .result-card {
                    box-shadow: none;
                    border: 1px solid #ddd;
                }
                
                .print-only {
                    display: block !important;
                }
            }
            
            /* Form specific responsive styles */
            @media (max-width: 768px) {
                .form-container {
                    padding: 15px;
                    width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                    margin-bottom: 15px; /* Reduce space between form and results */
                }
                
                .form-heading {
                    font-size: 20px;
                    margin-bottom: 15px;
                }
                
                .form-group {
                    margin-bottom: 12px;
                }
                
                .form-row {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .form-control {
                    height: 42px;
                    width: 100%;
                    padding: 8px 12px;
                    font-size: 15px;
                }
                
                select.form-control {
                    padding-right: 30px;
                }
                
                label {
                    font-size: 14px;
                    margin-bottom: 6px;
                    display: block;
                }
                
                .input-group {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .input-group-append {
                    margin-top: 8px;
                    width: 100%;
                }
                
                #regNoHelp {
                    height: 40px;
                    width: 40px;
                    position: absolute;
                    right: 0;
                    top: 30px;
                }
                
                .reg-input-container {
                    position: relative;
                    width: 100%;
                }
                
                .btn {
                    width: 100%;
                    padding: 12px 20px;
                    height: auto;
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .form-container {
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 10px; /* Further reduce space between form and results */
                }
                
                .form-heading {
                    font-size: 18px;
                    margin-bottom: 12px;
                }
                
                .form-group {
                    margin-bottom: 10px;
                }
                
                .form-control {
                    height: 40px;
                    font-size: 14px;
                }
                
                label {
                    font-size: 13px;
                    margin-bottom: 4px;
                }
                
                .btn {
                    padding: 10px 15px;
                    font-size: 15px;
                }
            }
            
            /* Additional spacing adjustments */
            @media (max-width: 480px) {
                #results {
                    margin-top: 10px;
                }
                
                #message {
                    margin-bottom: 10px;
                }
                
                /* Compact table type titles */
                .table-type-title {
                    margin: 15px 15px 8px 15px;
                    font-size: 15px;
                }
            }

            /* Loader styles */
            .loader-container {
                background: white;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                border: 1px solid #e2e8f0;
                margin: 15px 0;
            }
            
            .loader-message {
                color: #3a56d4;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 15px;
                letter-spacing: 0.5px;
                position: relative;
                display: inline-block;
                animation: text-pulse 2s infinite;
            }
            
            @keyframes text-pulse {
                0% { opacity: 1; }
                50% { opacity: 0.85; }
                100% { opacity: 1; }
            }
            
            .loader-message:after {
                content: '...';
                position: absolute;
                width: 24px;
                text-align: left;
                opacity: 1;
                animation: dots 1.5s infinite;
                overflow: hidden;
            }
            
            @keyframes dots {
                0% { width: 0; opacity: 1; }
                33% { width: 8px; opacity: 1; }
                66% { width: 16px; opacity: 1; }
                100% { width: 24px; opacity: 1; }
            }
            
            .loader-progress-container {
                height: 8px;
                background: #f0f4f8;
                border-radius: 20px;
                margin: 0 10px 10px 10px;
                overflow: hidden;
            }
            
            .loader-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #3a56d4, #6e8afb);
                border-radius: 20px;
                transition: width 0.3s ease;
                animation: pulse 1.5s infinite;
            }
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.8; }
                100% { opacity: 1; }
            }
            
            .loader-percentage {
                color: #718096;
                font-size: 14px;
                font-weight: 600;
            }
            
            @media (max-width: 480px) {
                .loader-container {
                    padding: 15px;
                    margin: 10px 0;
                }
                
                .loader-message {
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                
                .loader-percentage {
                    font-size: 13px;
                }
            }

            /* Enhanced form controls and dropdowns */
            select.form-control, input.form-control {
                height: 46px;
                padding: 0 15px;
                font-size: 15px;
                color: #4a5568;
                background-color: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                transition: all 0.2s ease;
                font-weight: 500;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
            
            /* Custom select styling */
            select.form-control {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%233a56d4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 12px center;
                background-size: 16px;
                padding-right: 40px;
            }
            
            /* Form labels styling */
            label {
                display: block;
                font-size: 15px;
                font-weight: 600;
                color: #4a5568;
                margin-bottom: 8px;
                transition: all 0.2s ease;
            }
            
            /* Placeholder styling */
            ::placeholder {
                color: #a0aec0;
                opacity: 1;
            }
            
            :-ms-input-placeholder {
                color: #a0aec0;
            }
            
            ::-ms-input-placeholder {
                color: #a0aec0;
            }
            
            .form-group {
                margin-bottom: 16px;
            }
            
            .form-group:focus-within label {
                color: #3a56d4;
            }
            
            select.form-control:focus, input.form-control:focus {
                border-color: #3a56d4;
                box-shadow: 0 0 0 3px rgba(58, 86, 212, 0.15);
                outline: none;
            }
            
            /* Option styling */
            select.form-control option {
                padding: 12px;
                font-size: 15px;
                color: #4a5568;
                background-color: #fff;
            }
            
            /* Disabled select styling */
            select.form-control:disabled {
                background-color: #f8fafc;
                color: #a0aec0;
                cursor: not-allowed;
                opacity: 0.8;
            }
            
            /* Button styling */
            .btn {
                height: 46px;
                padding: 0 20px;
                font-size: 15px;
                font-weight: 600;
                background: linear-gradient(135deg, #3a56d4, #6e8afb);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 2px 5px rgba(58, 86, 212, 0.2);
            }
            
            .btn:hover {
                background: linear-gradient(135deg, #304bc3, #5d79ea);
                box-shadow: 0 4px 10px rgba(58, 86, 212, 0.3);
            }
            
            .btn:active {
                transform: translateY(1px);
            }
            
            @media (max-width: 480px) {
                select.form-control, input.form-control {
                    height: 44px;
                    font-size: 14px;
                    padding: 0 12px;
                }
                
                select.form-control {
                    background-position: right 10px center;
                    padding-right: 35px;
                }
                
                .btn {
                    height: 44px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(styleElement);

        // Mark failed grades for better visibility
        markFailedGrades();

        // Show the action buttons after displaying results
        actionButtons.style.display = 'flex';
    }

    // Update fetch button click handler with improved loader
    fetchButton.addEventListener('click', () => {
        const semester = semesterSelect.value.trim().toLowerCase();
        const batch = batchSelect.value.trim();
        const regNo = regNoInput.value.trim();

        messageDiv.textContent = '';
        resultsContainer.innerHTML = '';

        // Hide form instructions once user attempts to fetch results
        if (formInstructions) {
            formInstructions.style.display = 'none';
        }

        if (!semester || !batch || regNo.length !== 11 || isNaN(regNo)) {
            messageDiv.innerHTML = `
                <div class="message error">
                    <div class="error-icon">⚠️</div>
                    <div class="error-message">
                        <div class="error-title">Please check your input</div>
                        <ul class="error-list">
                            ${!semester ? '<li>Select your semester</li>' : ''}
                            ${!batch ? '<li>Select examination year</li>' : ''}
                            ${regNo.length !== 11 || isNaN(regNo) ? '<li>Enter valid 11-digit registration number</li>' : ''}
                        </ul>
                    </div>
                </div>
            `;
            // Show instructions again if there are errors
            if (formInstructions) {
                formInstructions.style.display = 'block';
            }
            return;
        }

        // Advanced loader animation
        messageDiv.innerHTML = `
            <div class="enhanced-loader">
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                <div class="loader-text-container">
                    <div class="loader-text">Fetching your results<span class="loader-dots">...</span></div>
                    <div class="loader-steps">
                        <div class="loader-step active">Connecting to database</div>
                        <div class="loader-step">Searching records</div>
                        <div class="loader-step">Processing data</div>
                        <div class="loader-step">Preparing results</div>
                    </div>
                </div>
                <div class="loader-progress-container">
                    <div class="loader-progress-bar"></div>
                </div>
            </div>
        `;
        
        // Add styles for the enhanced loader
        const loaderStyles = document.createElement('style');
        loaderStyles.textContent = `
            .enhanced-loader {
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                padding: 25px;
                margin: 15px 0;
                text-align: center;
                border: 1px solid #e2e8f0;
                position: relative;
                overflow: hidden;
            }
            
            .spinner {
                animation: rotate 2s linear infinite;
                z-index: 2;
                width: 50px;
                height: 50px;
                margin: 0 auto 15px auto;
            }
            
            .path {
                stroke: #4361ee;
                stroke-linecap: round;
                animation: dash 1.5s ease-in-out infinite;
            }
            
            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }
            
            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 150;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 90, 150;
                    stroke-dashoffset: -35;
                }
                100% {
                    stroke-dasharray: 90, 150;
                    stroke-dashoffset: -124;
                }
            }
            
            .loader-text-container {
                margin-bottom: 20px;
            }
            
            .loader-text {
                font-size: 18px;
                font-weight: 600;
                color: #4361ee;
                margin-bottom: 8px;
                position: relative;
            }
            
            .loader-dots {
                display: inline-block;
                width: 20px;
                overflow: hidden;
                animation: dots 1.5s infinite steps(4, jump-none);
            }
            
            @keyframes dots {
                0% { width: 0; }
                100% { width: 20px; }
            }
            
            .loader-steps {
                display: flex;
                flex-direction: column;
                max-width: 220px;
                margin: 0 auto;
            }
            
            .loader-step {
                font-size: 14px;
                color: #718096;
                padding: 5px 0;
                opacity: 0.4;
                text-align: center;
                transition: opacity 0.3s ease;
            }
            
            .loader-step.active {
                opacity: 1;
                color: #4361ee;
                font-weight: 500;
            }
            
            .loader-progress-container {
                height: 4px;
                background-color: #edf2f7;
                border-radius: 2px;
                overflow: hidden;
                margin-top: 10px;
                position: relative;
            }
            
            .loader-progress-bar {
                position: absolute;
                height: 100%;
                background: linear-gradient(90deg, #4361ee, #6e8afb);
                border-radius: 2px;
                transition: width 0.3s ease;
                width: 0%;
            }
            
            .error-icon {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .error-title {
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .error-list {
                text-align: left;
                margin: 5px 0 0 0;
                padding-left: 20px;
            }
            
            .error-list li {
                margin-bottom: 3px;
            }
            
            @media (max-width: 768px) {
                .enhanced-loader {
                    padding: 20px 15px;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                }
                
                .loader-text {
                    font-size: 16px;
                }
                
                .loader-step {
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(loaderStyles);

        // Initialize progress bar animation with step transitions
        const progressBar = messageDiv.querySelector('.loader-progress-bar');
        const loaderSteps = messageDiv.querySelectorAll('.loader-step');
        let currentStep = 0;
        let progress = 0;
        
        // Helper to update active step
        const updateStep = (stepIndex) => {
            loaderSteps.forEach((step, i) => {
                if (i === stepIndex) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        };
        
        // Simulate progress through steps
        const progressInterval = setInterval(() => {
            progress += 1;
            
            // Update progress bar width
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 95)}%`;
            }
            
            // Update active step based on progress
            if (progress >= 20 && progress < 40 && currentStep !== 1) {
                currentStep = 1;
                updateStep(currentStep);
            } else if (progress >= 40 && progress < 70 && currentStep !== 2) {
                currentStep = 2;
                updateStep(currentStep);
            } else if (progress >= 70 && progress < 95 && currentStep !== 3) {
                currentStep = 3;
                updateStep(currentStep);
            }
            
            if (progress >= 98) {
                clearInterval(progressInterval);
            }
        }, 60);

        const url = `https://beu-result.anikeshroy62040.workers.dev//result?sem=${semester}&year=${batch}&reg_no=${regNo}`;
        console.log("Fetching URL:", url); // Log the URL

        fetch(url)
            .then(response => {
                console.log("Response Status:", response.status);
                if (!response.ok) throw new Error('No Result Found');
                return response.json();
            })
            .then(data => {
                console.log("Response Data:", data);
                clearInterval(progressInterval);
                messageDiv.textContent = '';
                
                // Update error message for no data
                if (!data || data.length === 0) {
                    messageDiv.innerHTML = `
                        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; background-color: #fff5f5; border: 2px solid #dc3545;">
                            <tr>
                                <td style="padding: 15px; text-align: center; border-bottom: 1.5px solid #dc3545;">
                                    <span style="color: #dc3545; font-size: 16px; font-weight: bold;">No Result Found</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px;">
                                    <div style="color: #dc3545; margin-bottom: 10px; font-weight: bold;">Please verify:</div>
                                    <ol style="color: #dc3545; margin-left: 20px; line-height: 1.6; font-weight: bold;">
                                        <li>Registration number is correct</li>
                                        <li>Selected semester is correct</li>
                                        <li>Selected examination year is correct</li>
                                        <li>Results have been published</li>
                                    </ol>
                                </td>
                            </tr>
                        </table>
                    `;
                    return;
                }
                
                // Filter results to only show exact registration number match
                const exactMatches = data.filter(entry => 
                    !entry.separator && entry.registration_no === regNo
                );
                
                if (exactMatches.length === 0) {
                    messageDiv.innerHTML = `
                        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; background-color: #fff5f5; border: 2px solid #dc3545;">
                            <tr>
                                <td style="padding: 15px; text-align: center; border-bottom: 1.5px solid #dc3545;">
                                    <span style="color: #dc3545; font-size: 16px; font-weight: bold;">No Exact Match Found</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px;">
                                    <div style="color: #dc3545; margin-bottom: 10px; font-weight: bold;">No results match the exact registration number: ${regNo}</div>
                                    <div style="color: #dc3545; margin-top: 10px;">
                                        Please verify you've entered the correct registration number.
                                    </div>
                                </td>
                            </tr>
                        </table>
                    `;
                    return;
                }
                
                // After successful fetch and before displaying results:
                // Hide the action buttons until results are displayed
                actionButtons.style.display = 'none';
                
                // Display only exact matches
                displayResult(exactMatches);
            })
            .catch(error => {
                clearInterval(progressInterval);
                messageDiv.innerHTML = `
                    <table style="width: 100%; border-collapse: collapse; margin: 10px 0; background-color: #fff5f5; border: 2px solid #dc3545;">
                        <tr>
                            <td style="padding: 15px; text-align: center; border-bottom: 1.5px solid #dc3545;">
                                <span style="color: #dc3545; font-size: 16px; font-weight: bold;">No Result Found</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 15px;">
                                <div style="color: #dc3545; margin-bottom: 10px; font-weight: bold;">Please verify the following:</div>
                                <ol style="color: #dc3545; margin-left: 20px; line-height: 1.6; font-weight: bold;">
                                    <li>Check if your registration number is entered correctly (Only Numbers)</li>
                                    <li>Registration number should be 11 digits only</li>
                                    <li>Ensure you've selected the correct semester</li>
                                    <li>Verify your batch year selection</li>
                                    <li>Confirm that your results have been published</li>
                                </ol>
                                <div style="color: #dc3545; margin-top: 10px; font-style: italic; font-weight: bold;">
                                    Example Registration Number Format: 23101134001
                                    <br><br>
                                    If the problem persists, your results might not be available in the database yet.
                                </div>
                            </td>
                        </tr>
                    </table>
                `;
                console.error('Error:', error);
            });
    });

    // Prevent default form submission
    document.querySelector('form')?.addEventListener('submit', (e) => e.preventDefault());

    // Add help button handler
    const regNoHelp = document.getElementById('regNoHelp');
    regNoHelp.addEventListener('click', () => {
        // Create tooltip element if it doesn't exist
        let tooltip = document.getElementById('reg-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'reg-tooltip';
            tooltip.className = 'reg-tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-header">Registration Number Format</div>
                <div class="tooltip-format">YY-BBB-CCC-NNN (11 digits)</div>
                <div class="tooltip-description">
                    <div><b>YY</b> = Year (23)</div>
                    <div><b>BBB</b> = Branch Code (101)</div>
                    <div><b>CCC</b> = College Code (134)</div>
                    <div><b>NNN</b> = Roll No (001)</div>
                </div>
                <div class="tooltip-section">
                    <div class="tooltip-subheader">Branch Codes:</div>
                    <div>101 = Civil Engineering</div>
                    <div>102 = Mechanical Engineering</div>
                    <div>104 = Electronics & Communication</div>
                </div>
                <div class="tooltip-section">
                    <div class="tooltip-subheader">College Codes:</div>
                    <div>134 = GEC Banka</div>
                    <div>135 = GEC Vaishali</div>
                </div>
                <div class="tooltip-example">Example: 23101134001</div>
                <div class="tooltip-close">Click anywhere to close</div>
            `;
            document.body.appendChild(tooltip);
            
            // Add styles for the tooltip
            const style = document.createElement('style');
            style.textContent = `
                .reg-tooltip {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                    z-index: 1000;
                    width: 320px;
                    font-size: 14px;
                    line-height: 1.6;
                    animation: fadeIn 0.3s ease;
                    border: 1px solid #e2e8f0;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -48%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                
                .tooltip-header {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: #3a56d4;
                    text-align: center;
                }
                
                .tooltip-format {
                    background: #f8fafc;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                }
                
                .tooltip-description {
                    margin-bottom: 15px;
                    color: #4a5568;
                }
                
                .tooltip-section {
                    margin-bottom: 15px;
                    color: #4a5568;
                }
                
                .tooltip-subheader {
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #2d3748;
                }
                
                .tooltip-example {
                    background: #ebf4ff;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    text-align: center;
                    color: #3a56d4;
                    border: 1px solid #c3dafe;
                }
                
                .tooltip-close {
                    text-align: center;
                    font-size: 12px;
                    color: #a0aec0;
                    margin-top: 5px;
                    cursor: pointer;
                }
                
                .backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.2);
                    z-index: 999;
                    animation: backdropFadeIn 0.3s ease;
                }
                
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Create backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'backdrop';
            document.body.appendChild(backdrop);
            
            // Close tooltip when clicking anywhere
            const closeTooltip = () => {
                tooltip.style.animation = 'fadeOut 0.3s ease forwards';
                backdrop.style.animation = 'backdropFadeOut 0.3s ease forwards';
                
                const fadeOutStyle = document.createElement('style');
                fadeOutStyle.textContent = `
                    @keyframes fadeOut {
                        from { opacity: 1; transform: translate(-50%, -50%); }
                        to { opacity: 0; transform: translate(-50%, -48%); }
                    }
                    
                    @keyframes backdropFadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
                document.head.appendChild(fadeOutStyle);
                
                setTimeout(() => {
                    tooltip.remove();
                    backdrop.remove();
                    fadeOutStyle.remove();
                }, 300);
            };
            
            backdrop.addEventListener('click', closeTooltip);
            tooltip.addEventListener('click', closeTooltip);
        }
    });

    // Update registration number input handler
    regNoInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        e.target.value = value;
        messageDiv.textContent = '';

        // Show semester selection message if not selected
        if (value.length > 0 && !semesterSelect.value) {
            messageDiv.innerHTML = `
                <div style="color: #856404; background: #fff3cd; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba;">
                    Please select your semester first
                </div>`;
            semesterSelect.focus();
            return;
        }

        // Show batch selection message if semester selected but batch not selected
        if (value.length > 0 && semesterSelect.value && !batchSelect.value) {
            messageDiv.innerHTML = `
                <div style="color: #856404; background: #fff3cd; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba;">
                    Please select examination year
                </div>`;
            batchSelect.focus();
            return;
        }

        // Show message to click the 'Get Result' button if 11 digits are entered
        if (value.length === 11 && semesterSelect.value && batchSelect.value) {
            messageDiv.innerHTML = `
                <div style="color: #004085; background: #cce5ff; padding: 10px; border-radius: 4px; border: 1px solid #b8daff; text-align: center;">
                    Click the 'Get Result' button to view your results
                </div>`;
            fetchButton.focus();
        }
        
        // Check if form is valid
        checkValidInputs();
    });

    // Add these constants at the top of your script
    const CSS_CLASSES = {
        FAILED_GRADE: 'failed-grade',
        PRINT_ONLY: 'print-only',
        RESULT_PAGE: 'result-page',
        MESSAGE: 'message'
    };

    // Then use them in your code like:
    function markFailedGrades() {
        const gradeElements = document.querySelectorAll('.marks-table td:nth-child(6)');
        gradeElements.forEach(element => {
            if (parseInt(element.textContent) < 40) {
                element.classList.add(CSS_CLASSES.FAILED_GRADE);
            }
        });
    }

    // Add this to handle responsive layouts
    function handleResponsiveLayout() {
        const container = getElement('.container');
        if (!container) return;

        if (window.innerWidth <= 1024) {
            container.style.width = '95%';
        } else {
            container.style.width = '1000px';
        }
        
        // Make form elements more mobile-friendly
        if (window.innerWidth <= 768) {
            // Get the registration number input and help button
            const regNoInput = document.getElementById('regNo');
            const regNoHelp = document.getElementById('regNoHelp');
            
            if (regNoInput && regNoHelp) {
                // Check if we've already wrapped the input
                if (!document.querySelector('.reg-input-container')) {
                    // Create a container for the registration input field
                    const container = document.createElement('div');
                    container.className = 'reg-input-container';
                    
                    // Insert the container before the input field
                    regNoInput.parentNode.insertBefore(container, regNoInput);
                    
                    // Move the input field inside the container
                    container.appendChild(regNoInput);
                    
                    // Move the help button inside the container if it's not in an input-group-append
                    if (!regNoHelp.closest('.input-group-append')) {
                        container.appendChild(regNoHelp);
                    }
                }
            }
        }
    }

    // Add resize listener
    window.addEventListener('resize', handleResponsiveLayout);
    // Initial call
    handleResponsiveLayout();
});
