import { z } from "zod";
import { zfd } from "zod-form-data";

export const planFormSchema = zfd.formData({
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
    .refine((file: File) => file.size < 1048576, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  s_thumbnail: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1048576, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." }),

  author_profile: zfd.file()
    .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
    .refine((file: File) => file.size < 1048576, { message: "파일 크기가 1MB 보다 작아야 합니다." })
    .refine((file: File) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), { message: "(jpeg, png, jpg) 파일만 업로드 가능합니다." })
})

export const lectureFormSchema = zfd.formData({
  title: zfd.text(
    z.string()
      .min(2, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' })
      .max(32, { message: '제목은 2자 이상 32자 이하로 입력해주세요.' })
  ),
  description: zfd.text(
    z.string()
      .min(2, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' })
      .max(1300, { message: '설명은 2자 이상 1300자 이하로 입력해주세요.' })
  ),

  hour: zfd.numeric(
    z.number()
      .min(0, { message: '시간은 0 이상 23 이하로 입력해주세요.' })
      .max(23, { message: '시간은 0 이상 23 이하로 입력해주세요.' })
  ),
  minute: zfd.numeric(
    z.number()
      .min(0, { message: '분은 0 이상 59 이하로 입력해주세요.' })
      .max(59, { message: '분은 0 이상 59 이하로 입력해주세요.' })
  ),

  bgm: zfd.file()
    .refine((file: File) => file.size < 314572800, { message: "파일 크기가 300MB 보다 작아야 합니다." }),

  startTimeList: zfd.repeatableOfType(zfd.text(z.string())),
  audioNameList: zfd.repeatableOfType(
    zfd.text(
      z.string()
        .refine((text: string) => text.length > 0, { message: "파일 이름을 입력해야 합니다." })
    )
  ),
  audioFileList: zfd.repeatableOfType(
    zfd.file()
      .refine((file: File) => file !== undefined, { message: "파일을 등록해야 합니다." })
      .refine((file: File) => file.size < 314572800, { message: "파일 크기가 300MB 보다 작아야 합니다." })
  ),

  captionList: zfd.repeatableOfType(zfd.text(z.string())),

})