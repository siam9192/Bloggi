"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import RichEditor from "../rich-editor";
import DateTimePicker from "../calender/DateTimePicker";
import SelectCategory from "../ui/SelectCategory";
import { getFormValues } from "@/utils/func";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import errorToast from "../toast/ErrorToast";
import { createBlog, updateBlog } from "@/services/blog.service";
import successToast from "../toast/SuccessToast";
import { useParams, useRouter } from "next/navigation";
import LoadingPopup from "../popup/LoadingPopup";
import { EBlogStatus, IBlog } from "@/types/blog.type";
import { IRetrieveCategory } from "@/types/category.type";

type TFormErrors = {
  editor?: string;
  title?: string;
  short_description?: string;
  featured_photo?: string;
  category?: string;
  publish_status?: string;
  privacy_status?: string;
};

interface IProps {
  blog: IBlog;
}

function BlogEditForm({ blog }: IProps) {
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [textEditorValue, setEditorValue] = useState("");
  const [scheduledDateTime, setScheduleDateTime] = useState<Date | null>(null);
  const [shouldShowDatePicker, setShouldShowDatePicker] = useState(false);
  const [featuredPhoto, setFeaturedPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const featuredPhotoInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const params = useParams();

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    // Get form values
    const { title, short_description, category, publish_status, privacy_status, type } =
      getFormValues(e.currentTarget, [
        "title",
        "short_description",
        "category",
        "publish_status",
        "privacy_status",
        "type",
      ]);

    const errors: TFormErrors = {};

    if (!title || title.trim().length < 10) {
      errors.title = "Title must be at least 10 characters long (excluding spaces).";
    }

    if (!short_description || short_description.trim().length < 20) {
      errors.short_description = "Short description must be at least 20 characters long.";
    }

    if (!textEditorValue || textEditorValue.trim().length < 200) {
      errors.editor = "Content must be at least 200 characters long.";
    }

    if (
      publish_status === "Scheduled" &&
      (!scheduledDateTime || isNaN(new Date(scheduledDateTime).getTime())) &&
      scheduledDateTime! < new Date()
    ) {
      errors.publish_status = "Please provide a valid scheduled date and time.";
    }

    if (!privacy_status) {
      errors.privacy_status = "Privacy status is required.";
    }

    try {
      const parsedCategory = JSON.parse(category);
      if (!parsedCategory || typeof parsedCategory !== "object") {
        errors.category = "Please select a valid category.";
      }
    } catch {
      errors.category = "Invalid category format.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true);
    try {
      let featured_image = blog.featured_image;
      if (featuredPhoto) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_IMG_BB_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}` as string,
          { image: featuredPhoto },
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        if (response.status !== 200) throw new Error();
        featured_image = response.data.data.display_url;
      }

      const payload = {
        title,
        short_description,
        category_id: JSON.parse(category).id,
        featured_image,
        content: textEditorValue,
        status: publish_status,
        privacy_status,
        publish_date:
          (publish_status === "Scheduled" && (scheduledDateTime || blog.publish_date)) ||
          new Date(),
        is_premium: type === "Premium" ? true : false,
      };

      const res = await updateBlog(blog.id, payload);
      if (!res.success) throw new Error(res.message);

      successToast("Blog updated successfully");
      router.push("/dashboard/author/my-blogs");
    } catch (error: any) {
      errorToast(error.message);
    }
    setIsLoading(false);
  };

  const handelScheduleOnChange = (date: Date) => setScheduleDateTime(date);

  const handelEditorOnChange = (value: string) => setEditorValue(value);

  const handelFeaturedInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    setFeaturedPhoto(files[0]);
  };

  useEffect(() => {
    if (blog.status === "Scheduled") setShouldShowDatePicker(true);
  }, [blog]);

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div className=" lg:grid grid-cols-6 gap-3">
          <div className="bg-white rounded-md  md:p-5 p-2 h-fit col-span-4">
            <RichEditor onChange={handelEditorOnChange} defaultValue={blog.content} />
            {formErrors.editor && <p className="mt-1 text-red-500">{formErrors.editor}</p>}
          </div>
          <div className=" md:p-5 p-2 rounded-md bg-white h-fit col-span-2 space-y-4">
            <div>
              <label htmlFor="title" className="font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Post Tittle Here.."
                defaultValue={blog.title}
                className="w-full p-2  border-2 rounded-md px-2 py-3 mt-2  focus:outline-blue-600"
              />
              {formErrors.title && <p className="mt-1 text-red-500">{formErrors.title}</p>}
            </div>
            <div className="font-medium">
              <label htmlFor="short_description" className="font-medium">
                Short Description:
              </label>
              <textarea
                name="short_description"
                id=""
                defaultValue={blog.short_description}
                className="w-full p-2  border-2 rounded-md px-2 py-3 mt-2 h-60 resize-none focus:outline-blue-600"
              />
              {formErrors.short_description && (
                <p className="mt-1 text-red-500">{formErrors.short_description}</p>
              )}
            </div>
            {/* Featured Photo input and preview */}
            <div>
              {!featuredPhoto || blog.featured_image ? (
                //  Image preview section
                <div>
                  <img
                    src={featuredPhoto ? URL.createObjectURL(featuredPhoto) : blog.featured_image}
                    alt=""
                  />
                  <div className="text-end mt-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white "
                      onClick={() => featuredPhotoInputRef.current?.click()}
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                // Image input section
                <div className="font-medium">
                  <label
                    htmlFor="featured_photo_input"
                    className="font-medium hover:cursor-pointer"
                  >
                    <div className="h-60  border-2 rounded-md bg-gray-100 flex justify-center items-center   flex-col">
                      <span className="text-5xl">
                        <CiImageOn />
                      </span>
                      <p className="text-[0.9rem] text-center">Chose Blog Cover Photo</p>
                    </div>
                  </label>

                  {formErrors.short_description && (
                    <p className="mt-1 text-red-500">{formErrors.short_description}</p>
                  )}
                </div>
              )}
              {formErrors.featured_photo && (
                <p className="mt-1 text-red-500">{formErrors.featured_photo}</p>
              )}
              <input
                type="file"
                ref={featuredPhotoInputRef}
                onChange={handelFeaturedInputOnChange}
                id="featured_photo_input"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <label className="font-medium">Chose Category:</label>
              <SelectCategory defaultValue={blog.category} />
              {formErrors.category && <p className="mt-1 text-red-500">{formErrors.category}</p>}
            </div>
            {blog.status === EBlogStatus.Scheduled && (
              <div>
                <label htmlFor="short_description" className="font-medium">
                  Publish Status:
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className=" mt-2 flex items-center gap-1">
                    <input
                      type="radio"
                      id="publish_status_publish_now"
                      name="publish_status"
                      value="Published"
                      defaultChecked={(blog.status as any) === EBlogStatus.Published}
                      onChange={(e) => e.target.checked && setShouldShowDatePicker(false)}
                    />
                    <label htmlFor="publish_status_publish_now">Publish Now</label>
                  </div>
                  <div className=" mt-2 flex items-center gap-1">
                    <input
                      type="radio"
                      id="publish_status_scheduled"
                      name="publish_status"
                      value="Scheduled"
                      defaultChecked={(blog.status as any) === EBlogStatus.Scheduled}
                      onChange={(e) => e.target.checked && setShouldShowDatePicker(true)}
                    />
                    <label htmlFor="publish_status_scheduled">Scheduled</label>
                  </div>
                </div>
                {formErrors.category && (
                  <p className="mt-1 text-red-500">{formErrors.publish_status}</p>
                )}
              </div>
            )}
            {shouldShowDatePicker && (
              <DateTimePicker
                defaultValue={new Date(blog.publish_date)}
                onChange={handelScheduleOnChange}
              />
            )}

            <div>
              <label className="font-medium">Privacy Status:</label>
              <div className="flex items-center gap-4 flex-wrap">
                <div className=" mt-2 flex items-center gap-1">
                  <input
                    type="radio"
                    id="public_status_public"
                    name="privacy_status"
                    value="Public"
                    defaultChecked
                  />
                  <label htmlFor="public_status_public">Public</label>
                </div>
                <div className=" mt-2 flex items-center gap-1">
                  <input
                    type="radio"
                    id="public_status_privacy"
                    name="privacy_status"
                    value="Private"
                    className=""
                  />
                  <label htmlFor="public_status_privacy">Private</label>
                </div>
              </div>
              {formErrors.category && (
                <p className="mt-1 text-red-500">{formErrors.privacy_status}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Type:</label>
              <div className="flex items-center gap-4 flex-wrap">
                <div className=" mt-2 flex items-center gap-1">
                  <input
                    type="radio"
                    id="type_free"
                    name="type"
                    value="Free"
                    defaultChecked={!blog.is_premium}
                  />
                  <label htmlFor="type_free">Free</label>
                </div>
                <div className=" mt-2 flex items-center gap-1">
                  <input
                    type="radio"
                    id="type_premium"
                    defaultChecked={blog.is_premium}
                    name="type"
                    value="Premium"
                    className=""
                  />
                  <label htmlFor="public_status_privacy">Premium</label>
                </div>
              </div>
              {formErrors.category && (
                <p className="mt-1 text-red-500">{formErrors.privacy_status}</p>
              )}
            </div>
          </div>
        </div>
        <div className=" py-5 flex items-center justify-end gap-2 my-2">
          <button type="submit" className="px-4 py-2 bg-primary_color text-white rounded-md">
            Submit
          </button>
        </div>
      </form>

      <LoadingPopup status={isLoading} />
    </>
  );
}

export default BlogEditForm;
