'use client';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  CreateWarrantyInput,
  ReceiptFile,
  WarrantyCategory,
} from '@/lib/types';
import { UploadToR2 } from '@/lib/UploadToR2';
import axios from 'axios';
import { FileText, ImageIcon, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddWarrentyItem() {
  const [formData, setFormData] = useState<CreateWarrantyInput>({
    title: '',
    category: 'electronics',
    purchase_date: '',
    warranty_expiry_date: '',
    price: 0,
    notes: '',
    receipt_files: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.purchase_date) {
      newErrors.purchase_date = 'Purchase date is required';
    }

    if (!formData.warranty_expiry_date) {
      newErrors.warranty_expiry_date = 'Warranty expiry date is required';
    }

    if (formData.purchase_date && formData.warranty_expiry_date) {
      if (
        new Date(formData.warranty_expiry_date) <
        new Date(formData.purchase_date)
      ) {
        newErrors.warranty_expiry_date =
          'Expiry date must be after purchase date';
      }
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((file) => {
        const isImage = file.type.startsWith('image/');
        const isPdf = file.type === 'application/pdf';
        return isImage || isPdf;
      });

      if (validFiles.length !== files.length) {
        toast('Invalid file type Only images and PDF files are allowed');
      }

      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) {
      toast('Validation Error Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadPromises = selectedFiles.map((file) => UploadToR2(file));
      const uploadResults = await Promise.allSettled(uploadPromises);

      // Map to ReceiptFile format with explicit literal types
      const receiptFiles: ReceiptFile[] = uploadResults.map((result) => {
        if (result.status === 'fulfilled' && 'key' in result.value) {
          return {
            success: true as const,
            key: result.value.key,
          } as ReceiptFile;
        } else {
          return {
            success: false as const,
            error:
              result.status === 'rejected'
                ? result.reason?.message || 'Upload failed'
                : 'Unknown error',
          } as ReceiptFile;
        }
      });

      // Filter only successful uploads for database
      const successfulFiles = receiptFiles.filter(
        (file): file is { success: true; key: string } => file.success === true
      );

      const failedCount = receiptFiles.length - successfulFiles.length;

      if (failedCount > 0) {
        toast.error(`${failedCount} file(s) failed to upload`);
      }

      if (successfulFiles.length === 0) {
        toast.error('All file uploads failed');
        return;
      }

      const dataToSubmit = {
        ...formData,
        receipt_files: successfulFiles,
      };
      console.log(formData);

      const response = await axios.post('/api/SetItem', dataToSubmit);

      if (response.status === 201) {
        toast.success(
          `Warranty item added with ${successfulFiles.length} file(s)`
        );

        setFormData({
          title: '',
          category: 'electronics',
          purchase_date: '',
          warranty_expiry_date: '',
          price: 0,
          notes: '',
          receipt_files: [],
        });
      }
      setSelectedFiles([]);
      setErrors({});
    } catch (error) {
      console.error('Error creating warranty item:', error);
      toast.error('Failed to create warranty item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="min-h-screen">
        <Section>
          <div className="max-w-7xl py-10 bg-slate-950/50 mx-auto border border-slate-800 rounded-xl px-4">
            <FieldSet>
              <form onSubmit={handleSubmit}>
                <FieldLegend className="">
                  <span className="text-slate-100 text-2xl">
                    Add new warranty item
                  </span>
                </FieldLegend>
                <FieldGroup>
                  <Field>
                    <FieldLabel
                      htmlFor="itemName"
                      className="text-slate-100"
                    >
                      Title
                    </FieldLabel>
                    <Input
                      id="itemName"
                      required
                      type="text"
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                      }}
                      placeholder="Enter full item name"
                      className="bg-slate-900/50 border border-slate-800 text-slate-400"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="category"
                      className="text-slate-100"
                    >
                      Category
                    </FieldLabel>
                    <Select
                      required
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          category: value as WarrantyCategory,
                        });
                      }}
                    >
                      <SelectTrigger className="bg-slate-900/50 border border-slate-800 text-slate-400">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-slate-800 text-slate-400">
                        <SelectItem value="electronics">Electornics</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="home & garden">
                          Home & Garden
                        </SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="tools">Tools</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </Field>
                  <div className="flex gap-4">
                    <Field>
                      <FieldLabel
                        htmlFor="purchaseDate"
                        className="text-slate-100"
                      >
                        Purchase Date
                      </FieldLabel>
                      <Input
                        id="purchaseDate"
                        required
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            purchase_date: e.target.value,
                          });
                        }}
                        placeholder="Enter full item name"
                        className="bg-slate-900/50 border border-slate-800 text-slate-400"
                      />
                      {errors.purchase_date && (
                        <p className="text-sm text-red-500">
                          {errors.purchase_date}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="expiryDate"
                        className="text-slate-100"
                      >
                        Warranty Expiry Date
                      </FieldLabel>
                      <Input
                        id="expiryDate"
                        required
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            warranty_expiry_date: e.target.value,
                          });
                        }}
                        placeholder="Enter full item name"
                        className="bg-slate-900/50 border border-slate-800 text-slate-400"
                      />
                      {errors.warranty_expiry_date && (
                        <p className="text-sm text-red-500">
                          {errors.warranty_expiry_date}
                        </p>
                      )}
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel
                      htmlFor="price"
                      className="text-slate-100"
                    >
                      Price
                    </FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      max="9999999999.99"
                      value={formData.price || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        });
                      }}
                      placeholder="0.00"
                      className="bg-slate-900/50 border border-slate-800 text-slate-400"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">{errors.price}</p>
                    )}
                  </Field>
                  <Field>
                    <div className="space-y-2">
                      <FieldLabel
                        htmlFor="receipt_files"
                        className="text-slate-100"
                      >
                        Receipt Files
                      </FieldLabel>
                      <div className="flex items-center gap-2">
                        <Input
                          id="receipt_files"
                          type="file"
                          multiple
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById('receipt_files')?.click()
                          }
                          className="w-full bg-slate-900/50 border border-slate-800 text-slate-400"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Receipt Files
                        </Button>
                      </div>
                      {selectedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                            >
                              <div className="flex items-center gap-3">
                                {file.type.startsWith('image/') ? (
                                  <ImageIcon className="h-5 w-5 text-slate-400" />
                                ) : (
                                  <FileText className="h-5 w-5 text-slate-400" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-slate-300">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="notes"
                      className="text-slate-100"
                    >
                      Notes (Optional)
                    </FieldLabel>
                    <Textarea
                      id="notes"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          notes: e.target.value,
                        });
                      }}
                      className="bg-slate-900/50 border border-slate-800 text-slate-400"
                      placeholder="Additional information about the warranty"
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 duration-300 ease-in "
                    >
                      {isSubmitting ? 'Adding...' : 'Add Warranty Item'}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </FieldSet>
          </div>
        </Section>
      </div>
    </div>
  );
}
