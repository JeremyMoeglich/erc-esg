import { get_request_body, has_admin_access } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import { v4 } from 'uuid';
import { contact_form_schema } from '$lib/scripts/universal/datatypes';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import { panic } from "functional-utilities"

// Read login credentials from environment variables
const emailUser = process.env.EMAIL_USER ?? panic("EMAIL_USER not set")
const emailPassword = process.env.EMAIL_PASSWORD ?? panic("EMAIL_PASSWORD not set")

export const POST: RequestHandler = async ({ request }) => {
	const { email, name, message, id, phone } = await get_request_body(request, contact_form_schema);

	if (id) {
		const response = await prisma_client.contactForm.findUnique({
			where: {
				id
			},
			select: {
				id: true
			}
		});
		if (response) {
			throw error(400, 'Form already submitted');
		}
	}
	const createdAt = new Date().toISOString();

	const data = {
		id: id ?? v4(),
		name,
		email,
		message,
		createdAt,
		phone
	};

	await prisma_client.contactForm.create({
		data
	});

	await sendEmail({
		from: emailUser,
		to: ["info@erc-heessen.de", "jeremy@moeglich.dev", "nojoapp@icloud.com"],
		subject: `Kontaktformular von ${name}`,
		text: JSON.stringify(data, undefined, 4)
	})

	return json({} as JsonObject);
};

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: emailUser,
	  pass: emailPassword,
	},
  });


  
async function sendEmail(mailOptions: SendMailOptions) {
	try {
	  const info = await transporter.sendMail(mailOptions);
	  console.log('Email sent: ' + info.response);
	} catch (error) {
	  console.error(error);
	}
  }


export const GET: RequestHandler = async ({ request }) => {
	if (!(await has_admin_access(request))) {
		throw error(403, 'Not authorized');
	}
	const contact_forms = await prisma_client.contactForm.findMany();

	return json({
		forms: contact_forms.map((v) => ({
			...v,
			createdAt: v.createdAt.toISOString()
		}))
	} as JsonObject);
};
