'use client';
import { KADFormInput } from '@kad-products/sofrito';
import { Form } from 'radix-ui';
import { useFieldContext } from './context';

type FieldMeta = {
	isValid: boolean;
	errors: Array<{ code: string; message: string }>;
};

function FieldComponent({
	label,
	required = false,
	name,
	meta,
	children,
	controlGroup = false,
}: {
	label: string;
	required?: boolean;
	name: string;
	meta: FieldMeta;
	children: React.ReactNode;
	controlGroup?: boolean;
}): React.ReactNode {
	if (controlGroup) {
		return (
			<Form.Field className="kad-form-field" name={name} asChild>
				<fieldset>
					<FieldLabel label={label} required={required} controlGroup={controlGroup} />
					<FieldError isValid={meta.isValid} errors={meta.errors} />
					<Form.Control asChild>{children}</Form.Control>
				</fieldset>
			</Form.Field>
		);
	}
	return (
		<Form.Field className="kad-form-field" name={name}>
			<FieldLabel label={label} required={required} controlGroup={controlGroup} />
			<FieldError isValid={meta.isValid} errors={meta.errors} />
			<Form.Control asChild>{children}</Form.Control>
		</Form.Field>
	);
}

function FieldLabel({
	label,
	required,
	controlGroup,
}: {
	label: string;
	required?: boolean;
	controlGroup?: boolean;
}): React.ReactNode {
	if (controlGroup) {
		return (
			<Form.Label className="kad-form-label" asChild>
				<legend>
					{label}
					{required && <span className="kad-form-input-required">*</span>}
				</legend>
			</Form.Label>
		);
	}
	return (
		<Form.Label className="kad-form-label">
			{label}
			{required && <span className="kad-form-input-required">*</span>}
		</Form.Label>
	);
}

function FieldError({
	isValid,
	errors,
}: {
	isValid: boolean;
	errors: Array<{ code: string; message: string }>;
}): React.ReactNode {
	if (isValid) {
		return null;
	}
	return (
		<div className="kad-form-field-error">
			{errors.map(error => (
				<Form.Message key={error.code} className="kad-form-message" forceMatch={true}>
					{error.message}
				</Form.Message>
			))}
		</div>
	);
}

export function RadioGroupInput({
	label,
	required = false,
	options,
}: {
	label: string;
	required?: boolean;
	options: Array<{ value: string; label: string }>;
}): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta} controlGroup>
			<KADFormInput.RadioGroup
				label={label}
				options={options}
				value={field.state.value}
				onChange={(value: string) => {
					field.handleChange(value);
					field.handleBlur();
				}}
			/>
		</FieldComponent>
	);
}

export function CheckboxGroupInput({
	label,
	required = false,
	options,
}: {
	label: string;
	required?: boolean;
	options: Array<{ value: string; label: string }>;
}): React.ReactNode {
	const field = useFieldContext<string[]>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta} controlGroup>
			<KADFormInput.CheckboxGroup
				options={options}
				value={field.state.value}
				onChange={(values: string[]) => {
					field.handleChange(values);
					field.handleBlur();
				}}
			/>
		</FieldComponent>
	);
}

export function DateInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Date name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} />
		</FieldComponent>
	);
}

export function NumberInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Number name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} />
		</FieldComponent>
	);
}

export function SelectInput({
	label,
	required = false,
	options,
}: {
	label: string;
	required?: boolean;
	options: Array<{ value: string; label: string }>;
}): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Select
				value={field.state.value}
				onChange={(value: string): void => {
					field.handleChange(value);
					field.handleBlur();
				}}
				options={options}
			/>
		</FieldComponent>
	);
}

export function SwitchInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<boolean>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Switch checked={field.state.value} onChange={field.handleChange} />
		</FieldComponent>
	);
}

export function TextareaInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Textarea
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={field.handleChange}
			/>
		</FieldComponent>
	);
}

export function TextInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<string>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta}>
			<KADFormInput.Text name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} />
		</FieldComponent>
	);
}

export function StringArrayInput({ label, required = false }: { label: string; required?: boolean }): React.ReactNode {
	const field = useFieldContext<string[]>();
	return (
		<FieldComponent label={label} required={required} name={field.name} meta={field.state.meta} controlGroup>
			<KADFormInput.StringArray
				name={field.name}
				value={field.state.value ?? []}
				onBlur={field.handleBlur}
				onChange={(value: string[]) => field.handleChange(value)}
			/>
		</FieldComponent>
	);
}
