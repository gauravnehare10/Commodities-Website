import { isPlaceholder } from '~/content';
import { showDraftNotes } from '~/lib/env';

/**
 * Renders a content string. Placeholder strings (unsupplied business content)
 * are highlighted in draft mode so they cannot be mistaken for real copy.
 */
export function ContentText({ children }: { children: string }) {
  if (showDraftNotes && isPlaceholder(children)) {
    return (
      <span className="placeholder" title="Awaiting business content">
        {children}
      </span>
    );
  }
  return <>{children}</>;
}
