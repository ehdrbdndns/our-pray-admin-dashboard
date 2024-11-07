import { z } from "zod";
import { zfd } from "zod-form-data";

export const createPlanFormSchema = z.object({
  title: z.string()
    .min(2, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' }),

  description: z.string()
    .min(2, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' })
    .max(512, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' }),

  author_name: z.string()
    .min(2, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' }),

  author_description: z.string()
    .min(2, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' })
    .max(1300, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' }),

  is_active: z.boolean(),

  thumbnail: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  s_thumbnail: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  author_profile: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." })
})

export const updatePlanFormSchema = z.object({
  title: z.string()
    .min(2, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' }),

  description: z.string()
    .min(2, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' })
    .max(512, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' }),

  author_name: z.string()
    .min(2, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' })
    .max(32, { message: '저자 이름은 2자 이상 32자 이하로 입력해주세요.' }),

  author_description: z.string()
    .min(2, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' })
    .max(1300, { message: '저자 소개는 2자 이상 1300자 이하로 입력해주세요.' }),

  is_active: z.boolean(),

  thumbnail: zfd.file()
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  s_thumbnail: zfd.file()
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  author_profile: zfd.file()
    .refine((file: File) => file.size < 1000000, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." })
})