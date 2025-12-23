"use client";

import { useRef } from "react";
import { projects } from "@modules/portfolio/data";
import { experiences } from "@modules/portfolio/experiences";

export default function PortfolioContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #portfolio-content,
          #portfolio-content * {
            visibility: visible;
          }
          #portfolio-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-size: 10pt;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
          @page {
            margin: 0;
            size: A4;
          }

          /* Remove all browser headers and footers */
          @page :left {
            margin: 0;
          }
          @page :right {
            margin: 0;
          }
          @page :first {
            margin: 0;
          }

          /* Add padding inside content to simulate margins */
          #portfolio-content {
            padding: 25mm 20mm;
            box-sizing: border-box;
            min-height: 297mm; /* A4 height */
          }

          /* Custom page number (won't work in all browsers) */
          @media print {
            .page-number {
              position: fixed;
              bottom: 10mm;
              right: 20mm;
              font-size: 9pt;
              color: #666;
            }

            /* Add spacing between sections for better page breaks */
            section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /* Ensure headers don't get orphaned */
            h2 {
              break-after: avoid;
              page-break-after: avoid;
            }
          }

          /* Ensure minimum font sizes for print */
          .print-title {
            font-size: 20pt !important;
          }
          .print-subtitle {
            font-size: 11pt !important;
          }
          .print-heading {
            font-size: 14pt !important;
          }
          .print-subheading {
            font-size: 12pt !important;
          }
          .print-body {
            font-size: 10px;
            line-height: 1.5;
          }
          .print-small {
            font-size: 10pt !important;
          }
        }

        @media (max-width: 768px) {
          .mobile-responsive {
            padding: 1rem;
          }
        }
      `}</style>

      <div>
        <button
          onClick={handleDownloadPDF}
          className="no-print fixed top-16 right-4 z-10 flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg transition-colors hover:bg-gray-800 sm:top-20 sm:right-6 sm:px-4 sm:text-sm"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="hidden sm:inline">PDF 다운로드</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <div
          id="portfolio-content"
          ref={contentRef}
          className="bg-white text-gray-900"
        >
          <header className="mb-6 border-b-2 border-gray-900 pb-4 sm:mb-8 sm:pb-6">
            <h1 className="print-title mb-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              포트폴리오
            </h1>
            <p className="print-subtitle text-base leading-relaxed text-gray-700 sm:text-lg">
              사용자 경험과 성능을 중시하는 프로덕트 엔지니어입니다.
            </p>
          </header>

          <section className="mb-8 sm:mb-10">
            <h2 className="print-heading mb-4 border-b-2 border-gray-300 pb-2 text-xl font-bold sm:mb-5 sm:text-2xl">
              경력
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {experiences.map((exp) => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className="pb-4 sm:pb-5"
                >
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="print-subheading text-base font-bold sm:text-lg">
                        {exp.company}
                      </h3>
                      <p className="print-body text-sm text-gray-600 sm:text-base">
                        {exp.role}
                      </p>
                    </div>
                    <span className="print-body mt-1 text-sm text-gray-600 sm:mt-0 sm:text-base">
                      {exp.period}
                    </span>
                  </div>
                  {exp.details && (
                    <ul className="print-body mt-3 ml-5 list-disc space-y-1 text-sm text-gray-700 sm:text-base">
                      {exp.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <h2 className="print-heading mb-4 border-b-2 border-gray-300 pb-2 text-xl font-bold sm:mb-5 sm:text-2xl">
              프로젝트
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="border-b border-gray-200 pb-4 last:border-0 sm:pb-5"
                >
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="print-subheading text-base font-bold sm:text-lg">
                      {project.title}
                    </h3>
                    {project.period && (
                      <span className="print-body mt-1 text-sm text-gray-600 sm:mt-0 sm:text-base">
                        {project.period}
                      </span>
                    )}
                  </div>
                  <p className="print-body mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {project.description}
                  </p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="print-body mb-3 ml-5 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="print-small rounded border border-gray-400 px-2 py-1 text-xs sm:px-2.5 sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <footer className="print-body no-print border-t-2 border-gray-300 pt-4 text-sm text-gray-600 sm:pt-5 sm:text-base">
            <p>협업이나 제안이 있다면 연락 주세요.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
