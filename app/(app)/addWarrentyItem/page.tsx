import Section from '@/components/Section';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function addWarrentyItem() {
  return (
    <div className="pt-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="min-h-screen">
        <Section>
          <div className="max-w-7xl py-10 bg-slate-950/50 mx-auto border border-slate-800 rounded-xl px-4">
            <FieldSet>
              <FieldLegend></FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel></FieldLabel>
                  <Input />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </Section>
      </div>
    </div>
  );
}
