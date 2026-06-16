import { assetPath } from '../lib/assetPath'

export default function MadeByClickBuild() {
  return (
    <div className="border-t border-white/5 bg-canvas py-3 text-center">
      <a
        href="https://vk.com/clickbuild"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] text-white/35 transition-colors hover:text-white/55"
      >
        <span>Сделано на</span>
        <span className="inline-flex h-[18px] w-[18px] shrink-0 overflow-hidden rounded-[3px]">
          <img
            src={assetPath('/clickbuild-logo.png')}
            alt=""
            width={18}
            height={36}
            className="max-w-none -translate-y-px grayscale brightness-[2] opacity-55"
          />
        </span>
        <span className="tracking-wide">ClickBuild</span>
      </a>
    </div>
  )
}
