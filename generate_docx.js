const fs = require('fs');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink
} = docx;

// Exact Color Palette from Template
const COLOR_NAVY_DARK = "1B2A4A";    // Left Sidebar & Header background
const COLOR_NAVY_SUBHEADER = "24365F"; // Sidebar section sub-banner background
const COLOR_GOLD = "C9A227";         // Gold Accent for Titles, Icons & Highlights
const COLOR_WHITE = "FFFFFF";        // White Text
const COLOR_LIGHT_GRAY = "E7EAF0";   // Light Subtext in Sidebar
const COLOR_BODY_DARK = "1F1F1F";    // Main Body Text
const COLOR_BODY_MUTED = "555555";   // Main Body Muted / Dates

function createSidebarHeader(title) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 20,
        color: COLOR_GOLD,
        font: "Calibri"
      })
    ],
    border: {
      bottom: { color: COLOR_GOLD, space: 4, style: BorderStyle.SINGLE, size: 8 }
    },
    spacing: { before: 180, after: 80 }
  });
}

function createMainHeader(title) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22,
        color: COLOR_NAVY_DARK,
        font: "Calibri"
      })
    ],
    border: {
      bottom: { color: COLOR_NAVY_DARK, space: 4, style: BorderStyle.SINGLE, size: 10 }
    },
    spacing: { before: 200, after: 100 }
  });
}

function createBulletItem(boldText, text) {
  return new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({ text: boldText, bold: true, size: 19, color: COLOR_BODY_DARK, font: "Calibri" }),
      new TextRun({ text: text, size: 19, color: COLOR_BODY_DARK, font: "Calibri" })
    ],
    spacing: { after: 60 }
  });
}

async function generateCV() {
  // 1. Header Banner Table
  const headerTable = new Table({
    width: { size: 11340, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 11340, type: WidthType.DXA },
            shading: { fill: COLOR_NAVY_DARK },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { color: COLOR_GOLD, style: BorderStyle.SINGLE, size: 36 } // Thick Gold Vertical Accent Line
            },
            margins: { top: 200, bottom: 200, left: 240, right: 240 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "EMMANUEL BRENYAH ADDAE",
                    bold: true,
                    size: 30,
                    color: COLOR_WHITE,
                    font: "Calibri"
                  })
                ],
                spacing: { after: 40 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "MOBILE DEVELOPER (FLUTTER / DART)",
                    bold: true,
                    size: 21,
                    color: COLOR_GOLD,
                    font: "Calibri"
                  })
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Takoradi, Ghana   |   +233 59 354 3427   |   +233 24 253 7088   |   addaebemmanuel@gmail.com",
                    size: 18,
                    color: COLOR_WHITE,
                    font: "Calibri"
                  })
                ],
                spacing: { after: 60 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "LinkedIn: ", bold: true, size: 18, color: COLOR_GOLD, font: "Calibri" }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({ text: "https://www.linkedin.com/in/emmanuel-addae-756894231", size: 18, color: COLOR_WHITE, underline: {}, font: "Calibri" })
                    ],
                    link: "https://www.linkedin.com/in/emmanuel-addae-756894231"
                  }),
                  new TextRun({ text: "   |   GitHub: ", bold: true, size: 18, color: COLOR_GOLD, font: "Calibri" }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({ text: "Visit My GitHub Page", size: 18, color: COLOR_WHITE, underline: {}, font: "Calibri" })
                    ],
                    link: "https://github.com/AddEmma"
                  }),
                  new TextRun({ text: "   |   Portfolio: ", bold: true, size: 18, color: COLOR_GOLD, font: "Calibri" }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({ text: "Here's the Site to My Portfolio", size: 18, color: COLOR_WHITE, underline: {}, font: "Calibri" })
                    ],
                    link: "https://emmavit.github.io/emmanuelbaddae-portfolio/"
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  // 2. Main Two-Column Table
  const mainTable = new Table({
    width: { size: 11340, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          // LEFT SIDEBAR COLUMN (Width: 3400 dxa, Shading: #1B2A4A)
          new TableCell({
            width: { size: 3400, type: WidthType.DXA },
            shading: { fill: COLOR_NAVY_DARK },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            margins: { top: 180, bottom: 180, left: 200, right: 200 },
            children: [
              // EDUCATION
              createSidebarHeader("EDUCATION"),
              new Paragraph({
                children: [new TextRun({ text: "BSc Computer Science & Engineering", bold: true, size: 19, color: COLOR_WHITE, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "University of Mines and Technology (UMaT), Takoradi", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Graduated 2025", bold: true, size: 17, color: COLOR_GOLD, font: "Calibri" })],
                spacing: { after: 120 }
              }),

              new Paragraph({
                children: [new TextRun({ text: "Dart & Flutter", bold: true, size: 19, color: COLOR_WHITE, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Udemy Online Course", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })],
                spacing: { after: 120 }
              }),

              new Paragraph({
                children: [new TextRun({ text: "Diploma in Product Management", bold: true, size: 19, color: COLOR_WHITE, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Alison – Online Courses", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "2025", bold: true, size: 17, color: COLOR_GOLD, font: "Calibri" })],
                spacing: { after: 120 }
              }),

              new Paragraph({
                children: [new TextRun({ text: "Web Development with HTML & CSS", bold: true, size: 19, color: COLOR_WHITE, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Alison – Online Courses", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "2023", bold: true, size: 17, color: COLOR_GOLD, font: "Calibri" })],
                spacing: { after: 120 }
              }),

              new Paragraph({
                children: [new TextRun({ text: "WASSCE", bold: true, size: 19, color: COLOR_WHITE, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Baidoo Bonsoe Senior High Technical School", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })],
                spacing: { after: 20 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "2018 – 2021", bold: true, size: 17, color: COLOR_GOLD, font: "Calibri" })],
                spacing: { after: 180 }
              }),

              // TECHNICAL SKILLS
              createSidebarHeader("TECHNICAL SKILLS"),
              new Paragraph({ children: [new TextRun({ text: "▸ Dart & Flutter", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ C++, JavaScript, HTML, CSS", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ MySQL, SQLite", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ API Integration", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Git / GitHub", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 180 } }),

              // TOOLS & PLATFORMS
              createSidebarHeader("TOOLS & PLATFORMS"),
              new Paragraph({ children: [new TextRun({ text: "▸ Google Workspace, Slack", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Jira, Miro Board, Zoom", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ MS Office Suite", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Google Docs, Sheets, Slides", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 180 } }),

              // SOFT SKILLS
              createSidebarHeader("SOFT SKILLS"),
              new Paragraph({ children: [new TextRun({ text: "▸ Problem-solving", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Teamwork", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Effective Communication", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Time Management", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Adaptability", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "▸ Easy-to-Relate", size: 18, color: COLOR_GOLD, font: "Calibri" })], spacing: { after: 180 } }),

              // LEADERSHIP
              createSidebarHeader("LEADERSHIP"),
              new Paragraph({ children: [new TextRun({ text: "Organizer", bold: true, size: 18, color: COLOR_WHITE, font: "Calibri" })], spacing: { after: 20 } }),
              new Paragraph({ children: [new TextRun({ text: "Church of Christ Campus Ministry, UMaT — 2024/2025", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })], spacing: { after: 100 } }),
              new Paragraph({ children: [new TextRun({ text: "President", bold: true, size: 18, color: COLOR_WHITE, font: "Calibri" })], spacing: { after: 20 } }),
              new Paragraph({ children: [new TextRun({ text: "Church of Christ Campus Ministry, Baidoo Bonsoe SHTS — 2020/2021", italic: true, size: 17, color: COLOR_LIGHT_GRAY, font: "Calibri" })], spacing: { after: 60 } })
            ]
          }),

          // RIGHT MAIN CONTENT COLUMN (Width: 7940 dxa, Shading: #FFFFFF)
          new TableCell({
            width: { size: 7940, type: WidthType.DXA },
            shading: { fill: COLOR_WHITE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            margins: { top: 180, bottom: 180, left: 240, right: 200 },
            children: [
              // PROFILE SUMMARY
              createMainHeader("PROFILE SUMMARY"),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Computer Science and Engineering graduate and Associate Mobile Developer with hands-on, production experience building and maintaining offline-first Flutter applications, sync-reliable mobile architectures, and cross-platform tooling. Having completed National Service (NPS), now actively seeking a full-time Mobile Developer (Flutter/Dart) role where I can apply proven experience in feature development, E2E testing, and error-reporting/monitoring tools to help teams ship reliable, user-centered mobile products. Comfortable working across distributed, remote-first teams using Git, Jira, Slack, and Miro, with a track record of clear technical documentation and stakeholder communication.",
                    size: 19,
                    color: COLOR_BODY_DARK,
                    font: "Calibri"
                  })
                ],
                spacing: { after: 160 }
              }),

              // WORK EXPERIENCE
              createMainHeader("WORK EXPERIENCE"),

              // Role 1: Associate Mobile Developer
              new Paragraph({
                children: [
                  new TextRun({ text: "Associate Mobile Developer, National Service Personnel (NPS)", bold: true, size: 20, color: COLOR_NAVY_DARK, font: "Calibri" }),
                  new TextRun({ text: "   Oct 2025 – Oct 2026", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { before: 100, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Vitara Company Ltd, Wa, Ghana  •  National Service — Completed", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 80 }
              }),
              createBulletItem("TreeSyt Mobile Features: ", "Built and shipped TreeSyt mobile features within an offline-first Flutter architecture, improving mobile application reliability and field UX."),
              createBulletItem("End-to-End (E2E) Testing: ", "Contributed to TreeSyt test cases across Mobile and Web, supporting end-to-end (E2E) testing of multiple feature workflows."),
              createBulletItem("Agent Onboarding App: ", "Contributed to a new mobile app for agent onboarding, supporting HR and Agent Managers through application review, interviewing, and training workflows."),
              createBulletItem("In-App Error Reporting History: ", "Built an in-app Error Reporting History feature enabling field agents to submit mobile issue reports directly."),
              createBulletItem("Flutter Web Admin Portal: ", "Built a companion Flutter Web application for the Mobile Team to track and triage reported mobile issues submitted from the field."),

              // Role 2: Product Management Intern
              new Paragraph({
                children: [
                  new TextRun({ text: "Product Management Intern", bold: true, size: 20, color: COLOR_NAVY_DARK, font: "Calibri" }),
                  new TextRun({ text: "   Sep – Dec 2024", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { before: 140, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Vitara Company Ltd, Wa, Ghana", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 80 }
              }),
              createBulletItem("Technical User Guides: ", "Documented mobile/web module functionalities and created comprehensive user guides, increasing onboarding efficiency for new staff."),
              createBulletItem("Employee Training & Adoption: ", "Trained 15+ employees on platform usage, leading to a 30% boost in adoption and proficiency."),

              // Role 3: Web Development Intern 2023
              new Paragraph({
                children: [
                  new TextRun({ text: "Web Development Intern", bold: true, size: 20, color: COLOR_NAVY_DARK, font: "Calibri" }),
                  new TextRun({ text: "   Sep – Dec 2023", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { before: 140, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "LoGig LLC, Takoradi, Ghana", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 80 }
              }),
              createBulletItem("Responsive Web Interfaces: ", "Developed responsive, mobile-first web interfaces using HTML, CSS, and JavaScript."),
              createBulletItem("Cross-Browser Testing: ", "Assisted in debugging and cross-browser testing, ensuring consistent functionality across major platforms."),
              createBulletItem("Front-End Documentation: ", "Contributed to documentation of front-end features for smoother knowledge transfer and scalability."),

              // Role 4: Web Development Intern 2022
              new Paragraph({
                children: [
                  new TextRun({ text: "Web Development Intern", bold: true, size: 20, color: COLOR_NAVY_DARK, font: "Calibri" }),
                  new TextRun({ text: "   Sep – Dec 2022", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { before: 140, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "LoGig LLC, Takoradi, Ghana", italic: true, size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 80 }
              }),
              createBulletItem("Web Applications: ", "Built web applications with JavaScript, HTML, and CSS, improving user experience and accessibility."),
              createBulletItem("Agile Collaboration: ", "Partnered with senior developers in an Agile setup, contributing to project milestones."),
              createBulletItem("Quality Testing: ", "Performed application testing across devices, reducing reported bugs by 5%."),

              // REFERENCES
              createMainHeader("REFERENCES"),
              new Paragraph({
                children: [
                  new TextRun({ text: "Engr Dr Albert K. Kwansah Ansah", bold: true, size: 19, color: COLOR_BODY_DARK, font: "Calibri" })
                ],
                spacing: { before: 80, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "University of Mines and Technology, Ghana   |   afkansah@umat.edu.gh   |   +233 24 951 8866", size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 80 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: "Dr Ezekiel Martey", bold: true, size: 19, color: COLOR_BODY_DARK, font: "Calibri" })
                ],
                spacing: { before: 60, after: 20 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "University of Mines and Technology, Ghana   |   Ezzy2win@hotmail.com   |   +233 24 965 3242", size: 18, color: COLOR_BODY_MUTED, font: "Calibri" })
                ],
                spacing: { after: 40 }
              })
            ]
          })
        ]
      })
    ]
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 450, bottom: 450, left: 450, right: 450 } // Tight 0.31 inch margins to match template
          }
        },
        children: [
          headerTable,
          new Paragraph({ spacing: { after: 100 } }), // small gap between header and main body
          mainTable
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("E:/MyProHub/MyPortfolio/Emmanuel_B_Addae_CV_Professional.docx", buffer);
  console.log("Successfully generated Emmanuel_B_Addae_CV_Professional.docx matching exact gold/navy design!");
}

generateCV().catch(err => console.error(err));
