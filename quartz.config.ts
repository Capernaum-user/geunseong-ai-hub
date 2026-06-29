import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "근성 · AI 지식허브",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    // 분석 비활성(null). Plausible은 GH Pages 서브패스(/geunseong-ai-hub/)에서
    // 도메인 스코프가 어긋나 이벤트가 조용히 0건 수집될 수 있어 보류한다.
    // 정식 분석 도입 시 plausible.io 사이트 등록 또는 self-host host 명시 후 재설정.
    analytics: null,
    locale: "ko-KR",
    // GitHub Pages: https://capernaum-user.github.io/geunseong-ai-hub/
    baseUrl: "capernaum-user.github.io/geunseong-ai-hub",
    ignorePatterns: ["private", "templates", ".obsidian", "archive"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // header/body는 Google 가용 폰트(OG 이미지 생성 호환). 실제 화면 표시는
        // quartz/styles/custom.scss에서 Pretendard(CDN)로 오버라이드한다.
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "JetBrains Mono",
      },
      colors: {
        // 따뜻한 에디토리얼 (D2 승인)
        lightMode: {
          light: "#FBFAF7",
          lightgray: "#e7e2d9",
          gray: "#9a9da4",
          darkgray: "#454852",
          dark: "#16181D",
          secondary: "#1B2440",
          tertiary: "#3a4a7a",
          highlight: "rgba(201, 232, 220, 0.35)",
          textHighlight: "#C9E8DC88",
        },
        darkMode: {
          light: "#16181D",
          lightgray: "#2b2e36",
          gray: "#6b6e76",
          darkgray: "#c7ccd4",
          dark: "#FBFAF7",
          secondary: "#C9E8DC",
          tertiary: "#DAD3F2",
          highlight: "rgba(201, 232, 220, 0.12)",
          textHighlight: "#C9E8DC55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
