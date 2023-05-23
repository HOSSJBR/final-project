import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Sidebar from "./Sidebar";

import { AiOutlineSelect } from "react-icons/ai";

import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";

import html2canvas from "html2canvas";
import { MdPreview } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const PreviewResume = () => {
	const [sidebar, setSidebar] = useState(false);

	const {
		state: { resumeData, template, color, user },
	} = useContext(AppContext);

	const docRef = useRef();

	const props = {
		color: color ? color : "#6ca0f5",
		data: resumeData,
		user,
		docRef,
	};

	let renderTemplate;

	let timesPrinted = 1;
	switch (template) {
		case 1:
			renderTemplate = <Template1 {...props} />;
			break;
		case 2:
			renderTemplate = <Template2 {...props} />;
			break;
		default:
			renderTemplate = <Template1 {...props} />;
	}

	const printDocument = () => {
		if (docRef.current) {
			html2canvas(docRef.current, {
				logging: true,
				letterRendering: 0.4,
				scale: 2,
				useCORS: true,
				removeContainer: true,
			}).then((canvas) => {
				timesPrinted++;
				const imgData = canvas.toDataURL("image/png");
				const width = 220;
				const height = (canvas.height * width) / canvas.width;
				const pdf = new jsPDF("p", "mm", "a4");

				pdf.addImage(imgData, "PNG", 0, 0, width, height);
				pdf.save(`${user.username}#${timesPrinted}-${Date.now()}`);
			});
		}
	};

	const previewPdf = () => {
		if (docRef.current) {
			html2canvas(docRef.current, {
				logging: true,
				letterRendering: 0.4,
				scale: 2,
				useCORS: true,
				removeContainer: true,
			}).then((canvas) => {
				const pdf = new jsPDF("p", "mm", "letter");
				const imgData = canvas.toDataURL("image/png");
				const width = 220;
				const height = (width / canvas.width) * canvas.height;
				pdf.addImage(imgData, "PNG", 0, 0, width, height);
				window.open(pdf.output("bloburl"), "_blank");
			});
		}
	};
	return (
		<Container>
			<Options>
				<button onClick={() => setSidebar(!sidebar)}>
					<AiOutlineSelect />
					Options
				</button>
				<button onClick={() => previewPdf()}>
					<MdPreview />
					Preview
				</button>
				<button onClick={printDocument}>
					<FiDownload />
					Download
				</button>
			</Options>
			<ResumeWrapper>
				{resumeData && user && <>{renderTemplate}</>}
			</ResumeWrapper>

			{sidebar && <Sidebar goBack={() => setSidebar(false)} />}
		</Container>
	);
};

const ResumeWrapper = styled.div`
	background: #fff;
	border-radius: 3px;
	overflow-y: auto;
	height: 100%;
`;

const Options = styled.div`
	padding-top: 0.3rem;

	display: flex;
	justify-content: space-between;
	button {
		background: none;
		outline: none;
		border: none;
		color: #d1cccb;
		cursor: pointer;
		font-family: "Noto Sans";
		text-transform: capitalize;
		font-weight: 300;
		font-size: 1.2rem;

		display: flex;
		align-items: center;
	}
`;
const Container = styled.div`
	background: #656e83;
	padding: 0.3rem 3rem;
	display: flex;
	flex-direction: column;
	overflow-wrap: break-word;
`;

export default PreviewResume;
