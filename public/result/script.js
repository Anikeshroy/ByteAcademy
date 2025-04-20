document.addEventListener("DOMContentLoaded", () => {
    // Add this helper function at the start of your script
    function getElement(selector, context = document) {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    }

    // Use it for critical elements
  const fetchButton = getElement("#fetchButton");
  const resultsContainer = getElement("#results");
  const actionButtons = getElement("#action-buttons");
  const printButton = getElement("#printButton");
  const snapshotButton = getElement("#snapshotButton");
  const formInstructions = getElement("#form-instructions");

    // Get all DOM elements
  const semesterSelect = document.getElementById("semester");
  const batchSelect = document.getElementById("batch");
  const messageDiv = document.getElementById("message");
  const regNoInput = document.getElementById("regNo");

  // Add print functionality
  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }

  // Function to check if form has valid inputs
  function checkValidInputs() {
    const semesterValue = semesterSelect.value.trim();
    const batchValue = batchSelect.value.trim();
    const regNoValue = regNoInput.value.trim();

    // If all fields have valid values
    if (
      semesterValue &&
      batchValue &&
      regNoValue.length === 11 &&
      !isNaN(regNoValue)
    ) {
      // Hide instructions
      if (formInstructions) {
        formInstructions.style.display = "none";
      }
      return true;
    } else {
      // Show instructions
      if (formInstructions) {
        formInstructions.style.display = "block";
      }
      return false;
    }
  }

  // Add event listeners to form fields to check validity
  semesterSelect.addEventListener("change", checkValidInputs);
  batchSelect.addEventListener("change", checkValidInputs);
  regNoInput.addEventListener("input", checkValidInputs);

    // Define semester to batch mapping
    const semesterToBatchMapping = {
    "1st": ["2023", "2022"],
    "2nd": ["2024", "2023"],
    "3rd": ["2023"],
    "4th": ["2023", "2022", "2025"],
    "5th": ["2023", "2022"],
    "6th": ["2024", "2023"],
    "7th": ["2023", "2022"],
    "8th": ["2024", "2023"],
    };

    // Handle semester selection change
  semesterSelect.addEventListener("change", () => {
        const selectedSemester = semesterSelect.value;
        const availableBatches = semesterToBatchMapping[selectedSemester];

    batchSelect.innerHTML =
      '<option value="" disabled selected>Select Examination Year</option>';
    messageDiv.textContent = "";

        if (availableBatches) {
      availableBatches.forEach((batch) => {
        const option = document.createElement("option");
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
  batchSelect.addEventListener("change", () => {
    messageDiv.textContent = "";
        
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
      entry.theory_subjects.forEach((subject) => {
        if (subject.grade === "F") {
                    failedSubjects.push({
                        code: subject.subject_code,
                        name: subject.subject_name,
            type: "Theory",
                    });
                }
            });
        }
        
        if (entry.practical_subjects) {
      entry.practical_subjects.forEach((subject) => {
        if (subject.grade === "F") {
                    failedSubjects.push({
                        code: subject.subject_code,
                        name: subject.subject_name,
            type: "Practical",
                    });
                }
            });
        }
        
        return failedSubjects;
    }

    // Function to format marks table
    function formatMarksTable(subjects, type) {
    if (!subjects || subjects.length === 0) return "";
        
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
                    ${subjects
                      .map(
                        (subject) => `
                        <tr>
                            <td>${subject.subject_code}</td>
                            <td class="subject-name">${
                              subject.subject_name
                            }</td>
                            <td>${subject.ese || "-"}</td>
                            <td>${subject.ia || "-"}</td>
                            <td>${subject.total || "0"}</td>
                            <td class="${
                              subject.grade === "F" ? "failed-grade" : ""
                            }">${subject.grade}</td>
                            <td>${subject.credit}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
    }

    // Function to format failed subjects display
    function formatFailedSubjects(failedSubjects) {
        if (failedSubjects.length === 0) {
            return '<div class="pass-status">PASS</div>';
        }

        return `
      <div class="failed-subjects-container">
        <div class="failed-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="failed-icon">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          <h4>Failed Subjects</h4>
            </div>
        
        <div class="failed-subjects-list">
          ${failedSubjects.map(subject => `
            <div class="failed-subject-item">
              <div class="failed-subject-name">${subject.name}</div>
              <div class="failed-subject-details">
                <span class="failed-subject-code">${subject.code}</span>
                <span class="failed-subject-type">${subject.type}</span>
                        </div>
                </div>
            `).join('')}
        </div>
      </div>
    `;
  }

  // Function for taking a snapshot of the result and saving it
  function takeSnapshot() {
    // Show a loading message
    messageDiv.innerHTML = `
            <div class="message success">
                Generating PDF... Please wait.
            </div>
        `;

    // Make a clone of the results container for PDF modification
    const pdfContainer = resultsContainer.cloneNode(true);
    
    // Apply compact styles for PDF generation - optimized for A4 paper
    const compactStyle = document.createElement('style');
    compactStyle.textContent = `
      /* Compact styles for PDF generation - A4 optimized with better text display */
      .result-page {
        transform: scale(0.98);
        transform-origin: top center;
        margin-bottom: -20px !important;
        max-width: 100% !important;
      }
      .watermark-disclaimer {
        font-size: 38px !important;
        opacity: 0.05 !important;
      }
      .watermark-disclaimer::after {
        font-size: 32px !important;
        opacity: 0.05 !important;
      }
      .university-header {
        padding: 15px 15px 10px !important;
      }
      .university-header h1 {
        font-size: 18px !important;
        margin-bottom: 3px !important;
        letter-spacing: -0.1px !important;
      }
      .semester-header {
        font-size: 14px !important;
      }
      .student-info-section {
        padding: 12px !important;
      }
      .student-info th, .student-info td {
        padding: 5px 6px !important;
        font-size: 11px !important;
        line-height: 1.4 !important;
      }
      .summary-card {
        padding: 6px 8px !important;
        min-width: unset !important;
      }
      .summary-title {
        font-size: 10px !important;
        margin-bottom: 4px !important;
        letter-spacing: 0 !important;
      }
      .summary-value {
        font-size: 16px !important;
      }
      .summary-value.small {
        font-size: 12px !important;
      }
      .section-title {
        font-size: 14px !important;
        margin: 12px 12px 8px 12px !important;
        padding-bottom: 4px !important;
      }
      .marks-section {
        margin-bottom: 12px !important;
      }
      .marks-table {
        margin: 0 12px 12px 12px !important;
        width: calc(100% - 24px) !important;
      }
      .marks-table th, .marks-table td {
        padding: 5px 6px !important;
        font-size: 11px !important;
        line-height: 1.3 !important;
        word-break: normal !important;
        height: auto !important;
      }
      .marks-table th {
        font-weight: 600 !important;
      }
      .subject-name {
        max-width: none !important;
        white-space: normal !important;
        overflow: visible !important;
        text-overflow: clip !important;
        word-wrap: break-word !important;
        max-height: none !important;
      }
      .table-type-title {
        font-size: 13px !important;
        margin: 12px 12px 6px 12px !important;
      }
      .semester-grade-wrapper {
        padding: 0 12px !important;
      }
      .semester-grade-table {
        margin: 0 0 12px 0 !important;
        width: 100% !important;
      }
      .semester-grade-table th, .semester-grade-table td {
        padding: 4px 4px !important;
        font-size: 10px !important;
        height: auto !important;
      }
      .cgpa-section {
        margin-bottom: 12px !important;
      }
      .disclaimer {
        padding: 6px !important;
        font-size: 9px !important;
        margin-top: 12px !important;
      }
      .failed-subjects-container {
        margin-bottom: 10px !important;
      }
      .failed-header {
        padding: 6px 8px !important;
      }
      .failed-header h4 {
        font-size: 12px !important;
      }
      .failed-subjects-list {
        padding: 8px !important;
        gap: 8px !important;
        display: flex !important;
        flex-wrap: wrap !important;
      }
      .failed-subject-item {
        padding: 6px !important;
        flex: 1 1 45% !important;
        min-width: 120px !important;
        height: auto !important;
      }
      .failed-subject-name {
        font-size: 11px !important;
        margin-bottom: 4px !important;
        white-space: normal !important;
        word-wrap: break-word !important;
      }
      .failed-subject-details {
        font-size: 9px !important;
      }
      /* Make sure all table cells have height */
      tr, td, th {
        height: auto !important;
        min-height: 16px !important;
      }
    `;
    pdfContainer.appendChild(compactStyle);

    // Make sure all HTML elements in the PDF container have proper styles for printing
    const allElements = pdfContainer.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.style) {
        // Ensure text doesn't get cut off
        el.style.overflow = 'visible';
        el.style.textOverflow = 'clip';
        // Make sure elements have proper height
        el.style.height = 'auto';
        el.style.minHeight = 'unset';
        el.style.maxHeight = 'none';
      }
    });

    // Specifically make sure table cells don't truncate text
    const tableCells = pdfContainer.querySelectorAll('td, th');
    tableCells.forEach(cell => {
      cell.style.whiteSpace = 'normal';
      cell.style.wordBreak = 'normal';
      cell.style.wordWrap = 'break-word';
      cell.style.height = 'auto';
      cell.style.width = 'auto';
      // Adjust padding to give more space
      cell.style.padding = '6px';
    });

    // Specifically handle subject names to prevent truncation
    const subjectNameCells = pdfContainer.querySelectorAll('.subject-name');
    subjectNameCells.forEach(cell => {
      cell.style.maxWidth = 'none';
      cell.style.whiteSpace = 'normal';
      cell.style.wordWrap = 'break-word';
      cell.style.overflow = 'visible';
      cell.style.textOverflow = 'clip';
    });

    // Get student information for the filename
    const semester = semesterSelect.value;
    const regNo = regNoInput.value;
    
    // Find student name from the result data
    let studentName = "";
    const studentNameElement = document.querySelector('.student-info td[colspan="3"]');
    if (studentNameElement) {
      studentName = studentNameElement.textContent.trim().split(' ')[0]; // Get first name
    }
    
    // Create filename in the format: firstname-regnum-semesterWithSuffix-Result
    const semesterWithSuffix = semester.replace(/\s/g, ""); // Remove any spaces
    const filename = `${studentName}-${regNo}-${semesterWithSuffix}Semester-Result.pdf`;
    
    // Initialize jsPDF - explicitly set to A4 paper size
    window.jsPDF = window.jspdf.jsPDF;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    // Get A4 page dimensions in mm (210 x 297 mm)
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Append the cloned content to body temporarily
    pdfContainer.style.display = 'block';
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.top = '-9999px';
    pdfContainer.style.left = '-9999px';
    document.body.appendChild(pdfContainer);
    
    // Create PDF with optimal settings for A4
    html2canvas(pdfContainer, {
      scale: 3, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      windowWidth: 794, // Approximately A4 width in pixels at 96 DPI
      windowHeight: 1123, // Approximately A4 height in pixels at 96 DPI
      onclone: (clonedDoc) => {
        // Additional adjustments to ensure content fits A4 properly
        const clonedResults = clonedDoc.querySelector('#results');
        if (clonedResults) {
          // Further ensure tables don't overflow
          const tables = clonedResults.querySelectorAll('table');
          tables.forEach(table => {
            table.style.tableLayout = 'fixed';
            table.style.width = '100%';
          });
          
          // Make sure text doesn't overflow
          const textElements = clonedResults.querySelectorAll('p, h1, h2, h3, h4, h5, h6, td, th');
          textElements.forEach(el => {
            el.style.overflow = 'hidden';
            el.style.textOverflow = 'ellipsis';
          });
        }
      }
    }).then((canvas) => {
      try {
        // Calculate dimensions to fit 95% of the page width for better visibility
        const imgWidth = pageWidth * 0.95;
        
        // Calculate aspect ratio
        const aspectRatio = canvas.width / canvas.height;
        
        // Calculate height based on width while preserving aspect ratio
        let imgHeight = imgWidth / aspectRatio;
        
        // Calculate horizontal margin to center horizontally (5% split into equal margins)
        const horizontalMargin = (pageWidth - imgWidth) / 2;
        
        // Top margin - position at top with just a small margin
        const topMargin = 10; // 10mm from top of page
        
        // If content is too tall, scale it down to fit on one page
        if (imgHeight > (pageHeight - topMargin - 10)) { // Subtract top margin and 10mm bottom margin
          imgHeight = pageHeight - topMargin - 10; // Leave 10mm at bottom
          // Adjust width to maintain aspect ratio
          const adjustedWidth = imgHeight * aspectRatio;
          
          // Center horizontally
          const adjustedHorizontalMargin = (pageWidth - adjustedWidth) / 2;
          
          // Add image to PDF - positioned at top
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95), 
            'JPEG', 
            adjustedHorizontalMargin, 
            topMargin, // Position from top
            adjustedWidth, 
            imgHeight,
            null,
            'FAST'
          );
        } else {
          // Add image to PDF - positioned at top (not centered vertically)
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95), 
            'JPEG', 
            horizontalMargin, 
            topMargin, // Position from top
            imgWidth, 
            imgHeight,
            null,
            'FAST'
          );
        }
        
        // Save PDF
        pdf.save(filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
        messageDiv.innerHTML = `
          <div class="message error">
            Failed to generate PDF. Error: ${error.message}. Please try again.
          </div>
        `;
      } finally {
        // Clean up - remove the temporary element
        document.body.removeChild(pdfContainer);
      }
      
      // Try to copy to clipboard if supported by browser
      try {
        const copyToClipboard = async () => {
          try {
            // Create a blob from the PDF and try to copy it
            const blob = pdf.output('blob');
            const item = new ClipboardItem({ 'application/pdf': blob });
            await navigator.clipboard.write([item]);
            return true;
          } catch (err) {
            console.error('Clipboard copy failed:', err);
            return false;
          }
        };
        
        // Try to copy to clipboard
        copyToClipboard().then(() => {
          // Reset watermark visibility on original container
          const originalWatermarks = document.querySelectorAll(".watermark-disclaimer");
          originalWatermarks.forEach((watermark) => {
            watermark.style.color = "rgba(220, 53, 69, 0.07)";
            watermark.style.fontSize = "42px";
            if (watermark.nextElementSibling) {
              watermark.nextElementSibling.style.color =
                "rgba(220, 53, 69, 0.07)";
              watermark.nextElementSibling.style.fontSize = "36px";
            }
          });
          
          // Show success message
          messageDiv.innerHTML = `
            <div class="message success">
              <div class="success-content">
                <div class="success-icon">✅</div>
                <div>
                  <div class="success-title">PDF saved!</div>
                </div>
              </div>
            </div>
          `;
        });
      } catch (err) {
        // Fallback for browsers without clipboard API support
        console.warn('Clipboard API not supported:', err);
        
        // Reset watermark visibility
        const originalWatermarks = document.querySelectorAll(".watermark-disclaimer");
        originalWatermarks.forEach((watermark) => {
          watermark.style.color = "rgba(220, 53, 69, 0.07)";
          watermark.style.fontSize = "42px";
          if (watermark.nextElementSibling) {
            watermark.nextElementSibling.style.color =
              "rgba(220, 53, 69, 0.07)";
            watermark.nextElementSibling.style.fontSize = "36px";
          }
        });
        
        messageDiv.innerHTML = `
          <div class="message success">
            <div class="success-content">
              <div class="success-icon">✅</div>
              <div>
                <div class="success-title">PDF saved!</div>
              </div>
            </div>
          </div>
        `;
      }
    }).catch((err) => {
      console.error("Error generating PDF:", err);
      messageDiv.innerHTML = `
        <div class="message error">
          Failed to generate PDF. Please try again.
        </div>
      `;

      // Remove the temporary element
      document.body.removeChild(pdfContainer);

      // Reset watermark visibility on error
      const originalWatermarks = document.querySelectorAll(".watermark-disclaimer");
      originalWatermarks.forEach((watermark) => {
        watermark.style.color = "rgba(220, 53, 69, 0.07)";
        watermark.style.fontSize = "42px";
        if (watermark.nextElementSibling) {
          watermark.nextElementSibling.style.color =
            "rgba(220, 53, 69, 0.07)";
          watermark.nextElementSibling.style.fontSize = "36px";
        }
      });
    });
  }

  // Add event listener for snapshot button
  if (snapshotButton) {
    snapshotButton.addEventListener("click", takeSnapshot);
  }

    // Function to display results
    function displayResult(data) {
    resultsContainer.innerHTML = "";
        
        data.forEach((entry) => {
            if (!entry.separator) {
                const failedSubjects = getFailedSubjects(entry);
        const cgpa =
          entry.semester_grades.find((g) => g.semester === "Cur. CGPA")?.sgpa ||
          "NA";
                
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
                                        <td colspan="3">${
                                          entry.student_name
                                        }</td>
                            </tr>
                            <tr>
                                        <th>Course</th>
                                        <td colspan="3">${
                                          entry.course_name
                                        }</td>
                            </tr>
                            <tr>
                                        <th>College</th>
                                        <td colspan="3">${
                                          entry.college_name
                                        }</td>
                            </tr>
                        </table>
                            </div>

                            <div class="result-summary">
                                <div class="summary-card">
                                    <div class="summary-title">SEMESTER GPA</div>
                                    <div class="summary-value">${
                                      entry.sgpa || "0.00"
                                    }</div>
                                </div>
                                <div class="summary-card">
                                    <div class="summary-title">CUMULATIVE GPA</div>
                                    <div class="summary-value">${cgpa}</div>
                                </div>
                                <div class="summary-card">
                                    <div class="summary-title">PUBLISH DATE</div>
                                    <div class="summary-value small">${
                                      entry.publish_date || "N/A"
                                    }</div>
                                </div>
                            </div>

                        <div class="marks-section">
                                <div class="section-title">Performance Details</div>
                            ${formatMarksTable(entry.theory_subjects, "Theory")}
                            ${formatMarksTable(
                              entry.practical_subjects,
                              "Practical"
                            )}
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
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "I"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "II"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "III"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "IV"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "V"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "VI"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "VII"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${
                                              entry.semester_grades.find(
                                                (g) => g.semester === "VIII"
                                              )?.sgpa || "NA"
                                            }</td>
                                            <td>${cgpa}</td>
                            </tr>
                        </table>
                                </div>
                            </div>

                            ${
                              failedSubjects.length > 0
                                ? `
                                <div class="remarks-section">
                                    <div class="section-title failed-title">Result Status</div>
                                    <div class="remarks-content">
                                        ${formatFailedSubjects(failedSubjects)}
                                    </div>
                                </div>
                            `
                                : ""
                            }
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
    const styleElement = document.createElement("style");
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
            
            .failed-subjects-container {
                background: #fff8f8;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #f1a9a0;
                box-shadow: 0 4px 12px rgba(220, 53, 69, 0.1);
            }
            
            .failed-header {
                background: linear-gradient(to right, #e74c3c, #c0392b);
                color: white;
                padding: 12px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .failed-header h4 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .failed-icon {
                flex-shrink: 0;
            }
            
            .failed-subjects-list {
                padding: 15px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 10px;
            }
            
            .failed-subject-item {
                background: white;
                border-radius: 6px;
                padding: 12px;
                border-left: 4px solid #e74c3c;
                box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            }
            
            .failed-subject-name {
                font-weight: 600;
                color: #e74c3c;
                margin-bottom: 8px;
                    font-size: 14px;
                }
                
            .failed-subject-details {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #666;
            }
            
            .failed-subject-code {
                background: #f8d7da;
                padding: 2px 6px;
                border-radius: 4px;
                color: #721c24;
                font-weight: 500;
            }
            
            .failed-subject-type {
                background: #f8f9fa;
                padding: 2px 6px;
                border-radius: 4px;
                color: #495057;
            }

            /* Success message styling */
            .success-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .success-icon {
                font-size: 24px;
            }
            
            .success-title {
                font-weight: 600;
                font-size: 16px;
                margin-bottom: 4px;
            }
            
            .success-details {
                    font-size: 14px;
                opacity: 0.8;
            }
        `;
    document.head.appendChild(styleElement);

    // Mark failed grades for better visibility
    markFailedGrades();

    // Show the action buttons after displaying results
    actionButtons.style.display = "flex";
  }

  // Update fetch button click handler with improved loader
  fetchButton.addEventListener("click", () => {
    const semester = semesterSelect.value.trim().toLowerCase();
    const batch = batchSelect.value.trim();
    const regNo = regNoInput.value.trim();

    messageDiv.textContent = "";
    resultsContainer.innerHTML = "";

    // Hide form instructions once user attempts to fetch results
    if (formInstructions) {
      formInstructions.style.display = "none";
    }

    if (!semester || !batch || regNo.length !== 11 || isNaN(regNo)) {
      messageDiv.innerHTML = `
                <div class="validation-error">
                    <div class="error-header">
                        <div class="error-icon">⚠️</div>
                        <h3>Please Check Your Input</h3>
                    </div>
                    <div class="error-body">
                        ${
                          !semester
                            ? `<div class="error-item">
                                <span class="error-badge">1</span>
                                <span class="error-text">Please select your semester</span>
                            </div>`
                            : ""
                        }
                        
                        ${
                          !batch
                            ? `<div class="error-item">
                                <span class="error-badge">${
                                  !semester ? "2" : "1"
                                }</span>
                                <span class="error-text">Please select examination year</span>
                            </div>`
                            : ""
                        }
                        
                        ${
                          regNo.length !== 11 || isNaN(regNo)
                            ? `<div class="error-item">
                                <span class="error-badge">${
                                  !semester && !batch
                                    ? "3"
                                    : !semester || !batch
                                    ? "2"
                                    : "1"
                                }</span>
                                <span class="error-text">Please enter a valid 11-digit registration number</span>
                                <span class="error-help" id="errorRegNoHelp">Need help?</span>
                            </div>`
                            : ""
                        }
                    </div>
                </div>
            `;

      // Add styles for the validation error message
      const errorStyleElement = document.createElement("style");
      errorStyleElement.textContent = `
                .validation-error {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.1);
                    border: 1px solid #ffcdd2;
                    overflow: hidden;
                    margin: 15px 0;
                    animation: slideInUp 0.3s ease;
                }
                
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .error-header {
                    display: flex;
                    align-items: center;
                    background: #ffebee;
                    padding: 12px 15px;
                    border-bottom: 1px solid #ffcdd2;
                }
                
                .error-header h3 {
                    margin: 0;
                    color: #d32f2f;
                    font-size: 16px;
                    font-weight: 600;
                }
                
                .error-icon {
                    font-size: 20px;
                    margin-right: 10px;
                }
                
                .error-body {
                    padding: 15px;
                }
                
                .error-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                    background: #fafafa;
                    padding: 10px 15px;
                    border-radius: 8px;
                    border-left: 3px solid #f44336;
                }
                
                .error-item:last-child {
                    margin-bottom: 0;
                }
                
                .error-badge {
                    background: #f44336;
                    color: white;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                    margin-right: 12px;
                }
                
                .error-text {
                    flex: 1;
                    color: #333;
                    font-weight: 500;
                }
                
                .error-help {
                    color: #1976d2;
                    font-size: 13px;
                    text-decoration: underline;
                    cursor: pointer;
                    margin-left: 10px;
                }
                
                @media (max-width: 480px) {
                    .error-header h3 {
                    font-size: 15px;
                }
                
                    .error-item {
                    padding: 8px 12px;
                    }
                    
                    .error-text {
                    font-size: 14px;
                    }
                }
            `;
      document.head.appendChild(errorStyleElement);

      // Add event listener to the 'Need help?' link for registration number
      setTimeout(() => {
        const errorRegNoHelp = document.getElementById("errorRegNoHelp");
        if (errorRegNoHelp) {
          errorRegNoHelp.addEventListener("click", () => {
            // Trigger the same help tooltip as the regular help button
            document.getElementById("regNoHelp").click();
          });
        }
      }, 100);

      // Show instructions again if there are errors
      if (formInstructions) {
        formInstructions.style.display = "block";
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
                </div>
                    <div class="loader-progress-container">
                    <div class="loader-progress-bar"></div>
                    </div>
                </div>
            `;

    // Add styles for the enhanced loader
    const loaderStyles = document.createElement("style");
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
            }
        `;
    document.head.appendChild(loaderStyles);

    // Initialize progress bar animation
    const progressBar = messageDiv.querySelector(".loader-progress-bar");
    let progress = 0;

    // Simulate progress through steps
    const progressInterval = setInterval(() => {
      progress += 1;

      // Update progress bar width
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 95)}%`;
      }

      if (progress >= 98) {
        clearInterval(progressInterval);
      }
    }, 60);

        const url = `https://beu-result.anikeshroy62040.workers.dev//result?sem=${semester}&year=${batch}&reg_no=${regNo}`;
        console.log("Fetching URL:", url); // Log the URL

        fetch(url)
      .then((response) => {
                console.log("Response Status:", response.status);
        if (!response.ok) throw new Error("No Result Found");
                return response.json();
            })
      .then((data) => {
                console.log("Response Data:", data);
        clearInterval(progressInterval);
        messageDiv.textContent = "";
                
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
        const exactMatches = data.filter(
          (entry) => !entry.separator && entry.registration_no === regNo
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
        actionButtons.style.display = "none";
                
                // Display only exact matches
                displayResult(exactMatches);
            })
      .catch((error) => {
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
        console.error("Error:", error);
            });
    });

    // Prevent default form submission
  document
    .querySelector("form")
    ?.addEventListener("submit", (e) => e.preventDefault());

    // Add help button handler
  const regNoHelp = document.getElementById("regNoHelp");
  regNoHelp.addEventListener("click", () => {
        // Create tooltip element if it doesn't exist
    let tooltip = document.getElementById("reg-tooltip");
        if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "reg-tooltip";
      tooltip.className = "reg-tooltip";
            tooltip.innerHTML = `
                <div class="tooltip-header">Registration Number Format</div>
                <div class="tooltip-format">YY-BBB-CCC-NNN (11 digits)</div>
                <div class="tooltip-description">
                    <div class="tooltip-field"><span>YY</span> - Year (22)</div>
                    <div class="tooltip-field"><span>BBB</span> - Branch Code (157)</div>
                    <div class="tooltip-field"><span>CCC</span> - College Code (133)</div>
                    <div class="tooltip-field"><span>NNN</span> - Roll No (001)</div>
                </div>
                <div class="tooltip-divider"></div>
                <div class="tooltip-section">
                    <div class="tooltip-subheader">Branch Codes:</div>
                    <div class="tooltip-grid">
                        <div class="tooltip-item">105 - Computer Science & Engineering</div>
                        <div class="tooltip-item">157 - Computer Science & Engineering (AI & ML)</div>
                        <div class="tooltip-item">153 - Computer Science & Engineering (Data Science)</div>
                        <div class="tooltip-item">155 - Computer Science & Engineering (Internet Of Things)</div>
                        <div class="tooltip-item">152 - Computer Science & Engineering (Cyber Security)</div>
                        <div class="tooltip-item">101 - Civil Engineering</div>
                        <div class="tooltip-item">102 - Mechanical Engineering</div>
                        <div class="tooltip-item">103 - Electrical Engineering</div>
                        <div class="tooltip-item">104 - Electronics & Communication</div>
                        <div class="tooltip-item">112 - Fire Technology and Safety</div>

                    </div>
                </div>
                <div class="tooltip-section">
                    <div class="tooltip-subheader">College Codes:</div>
                    <div class="tooltip-grid">
                        <div class="tooltip-item">107 - Muzaffarpur Institute of Technology, Muzaffarpur</div>
                        <div class="tooltip-item">108 - Bhagalpur Engineering College, Bhagalpur</div>
                        <div class="tooltip-item">109 - Nalanda College Of Engineering Nalanda</div>
                        <div class="tooltip-item">110 - Gaya College Of Engineering Gaya</div>
                        <div class="tooltip-item">111 - Darbhanga College Of Engineering Darbhanga</div>
                        <div class="tooltip-item">113 - Motihari College Of Engineering Motihari</div>
                        <div class="tooltip-item">117 - LNJPIT Chapra</div>
                        <div class="tooltip-item">124 - Sershah Engineering College, Sasaram</div>
                        <div class="tooltip-item">125 - RRSDCE Begusarai</div>
                        <div class="tooltip-item">126 - Bakhtiyarpur College of Engineering, Patna</div>
                        <div class="tooltip-item">127 - Sitamarhi Institute of Technology, Sitamarhi</div>
                        <div class="tooltip-item">128 - B.P. Mandal College of Engineering, Madhepura</div>
                        <div class="tooltip-item">129 - Katihar College Of Engineering Katihar</div>
                        <div class="tooltip-item">130 - Supaul College of Engineering, Supaul</div>
                        <div class="tooltip-item">131 - Purnea College Of Engineering Purnea</div>
                        <div class="tooltip-item">132 - Saharsa College of Engineering, Saharsa</div>
                        <div class="tooltip-item">133 - Government Engineering College, Jamui</div>
                        <div class="tooltip-item">134 - Government Engineering College, Banka</div>
                        <div class="tooltip-item">135 - Government Engineering College, Vaishali</div>
                        <div class="tooltip-item">141 - Government Engineering College, Nawada</div>
                        <div class="tooltip-item">142 - Government Engineering College, Kishanganj</div>
                        <div class="tooltip-item">144 - Government Engineering College, Munger</div>
                        <div class="tooltip-item">145 - Government Engineering College, Sheohar</div>
                        <div class="tooltip-item">146 - Government Engineering College, West Champaran</div>
                        <div class="tooltip-item">147 - Government Engineering College, Aurangabad</div>
                        <div class="tooltip-item">148 - Government Engineering College, Kaimur</div>
                        <div class="tooltip-item">149 - Government Engineering College, Gopalganj</div>
                        <div class="tooltip-item">150 - Government Engineering College, Madhubani</div>
                        <div class="tooltip-item">151 - Government Engineering College, Siwan</div>
                        <div class="tooltip-item">152 - Government Engineering College, Jehanabad</div>
                        <div class="tooltip-item">153 - Government Engineering College, Arwal</div>
                        <div class="tooltip-item">154 - Government Engineering College, Khagaria</div>
                        <div class="tooltip-item">156 - Government Engineering College, Bhojpur</div>
                        <div class="tooltip-item">157 - Government Engineering College, Sheikhpura</div>
                        <div class="tooltip-item">158 - Government Engineering College, Lakhisarai</div>
                        <div class="tooltip-item">159 - Government Engineering College, Samastipur</div>
                        <div class="tooltip-item">165 - SPNREC Araria</div>
                    </div>
                </div>
                <div class="tooltip-example">Example: 23101134001</div>
                <button class="tooltip-close">Close</button>
            `;
            document.body.appendChild(tooltip);
            
            // Add styles for the tooltip
      const style = document.createElement("style");
            style.textContent = `
                .reg-tooltip {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    z-index: 1000;
                    width: 60%;
                    max-width: 800px;
                    font-size: 14px;
                    line-height: 1.6;
                    animation: fadeIn 0.3s ease;
                    border: 1px solid #e2e8f0;
                    overflow-y: auto;
                    max-height: 85vh;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -48%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                
                .tooltip-header {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: #3a56d4;
                    text-align: center;
                }
                
                .tooltip-format {
                    background: #f8fafc;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                    letter-spacing: 0.5px;
                }
                
                .tooltip-description {
                    margin-bottom: 15px;
                    color: #4a5568;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 8px;
                }
                
                .tooltip-field {
                    display: flex;
                    align-items: center;
                }
                
                .tooltip-field span {
                    font-weight: 600;
                    color: #3a56d4;
                    margin-right: 8px;
                    width: 35px;
                    display: inline-block;
                    text-align: center;
                }
                
                .tooltip-divider {
                    height: 1px;
                    background-color: #e2e8f0;
                    margin: 15px 0;
                }
                
                .tooltip-section {
                    margin-bottom: 15px;
                    color: #4a5568;
                }
                
                .tooltip-subheader {
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #2d3748;
                }
                
                .tooltip-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 8px;
                }
                
                .tooltip-item {
                    background: #f1f5f9;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                }
                
                .tooltip-example {
                    background: #ebf4ff;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-align: center;
                    color: #3a56d4;
                    border: 1px solid #c3dafe;
                }
                
                .tooltip-close {
                    width: 100%;
                    background: #4361ee;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.2s;
                    margin-top: 5px;
                }
                
                .tooltip-close:hover {
                    background: #3a56d4;
                }
                
                .backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    animation: backdropFadeIn 0.3s ease;
                    backdrop-filter: blur(2px);
                }
                
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                /* Mobile adjustments */
                @media (max-width: 480px) {
                    .reg-tooltip {
                        padding: 20px;
                        width: 92vw;
                        font-size: 13px;
                    }
                    
                    .tooltip-header {
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    
                    .tooltip-format {
                        padding: 8px 10px;
                        margin-bottom: 12px;
                        font-size: 13px;
                    }
                    
                    .tooltip-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .tooltip-example {
                        padding: 8px 10px;
                        margin-bottom: 15px;
                    }
                    
                    .tooltip-item {
                        padding: 5px 8px;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Create backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "backdrop";
            document.body.appendChild(backdrop);
            
      // Close tooltip when clicking anywhere or on close button
            const closeTooltip = () => {
        tooltip.style.animation = "fadeOut 0.3s ease forwards";
        backdrop.style.animation = "backdropFadeOut 0.3s ease forwards";
                
        const fadeOutStyle = document.createElement("style");
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
            
      backdrop.addEventListener("click", closeTooltip);
      tooltip
        .querySelector(".tooltip-close")
        .addEventListener("click", closeTooltip);
        }
    });

    // Update registration number input handler
  regNoInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        e.target.value = value;
    messageDiv.textContent = "";

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
    FAILED_GRADE: "failed-grade",
    PRINT_ONLY: "print-only",
    RESULT_PAGE: "result-page",
    MESSAGE: "message",
    };

    // Then use them in your code like:
    function markFailedGrades() {
    const gradeElements = document.querySelectorAll(
      ".marks-table td:nth-child(6)"
    );
    gradeElements.forEach((element) => {
            if (parseInt(element.textContent) < 40) {
                element.classList.add(CSS_CLASSES.FAILED_GRADE);
            }
        });
    }

    // Add this to handle responsive layouts
    function handleResponsiveLayout() {
    const container = getElement(".container");
        if (!container) return;

        if (window.innerWidth <= 1024) {
      container.style.width = "95%";
        } else {
      container.style.width = "1000px";
        }
        
        // Make form elements more mobile-friendly
        if (window.innerWidth <= 768) {
            // Get the registration number input and help button
      const regNoInput = document.getElementById("regNo");
      const regNoHelp = document.getElementById("regNoHelp");
            
            if (regNoInput && regNoHelp) {
                // Check if we've already wrapped the input
        if (!document.querySelector(".reg-input-container")) {
                    // Create a container for the registration input field
          const container = document.createElement("div");
          container.className = "reg-input-container";
                    
                    // Insert the container before the input field
                    regNoInput.parentNode.insertBefore(container, regNoInput);
                    
                    // Move the input field inside the container
                    container.appendChild(regNoInput);
                    
                    // Move the help button inside the container if it's not in an input-group-append
          if (!regNoHelp.closest(".input-group-append")) {
                        container.appendChild(regNoHelp);
                    }
                }
            }
        }
    }

    // Add resize listener
  window.addEventListener("resize", handleResponsiveLayout);
    // Initial call
    handleResponsiveLayout();
});
