export function getPadding(el?: HTMLElement | null) {
    if (!el) {
        return {
            inline: 0,
            block: 0,
        }
    }
    const styles = getComputedStyle(el)
    const paddingInlineStart = parseFloat(styles.paddingInlineStart) || 0
    const paddingInlineEnd = parseFloat(styles.paddingInlineEnd) || 0
    const paddingBlockStart = parseFloat(styles.paddingBlockStart) || 0
    const paddingBlockEnd = parseFloat(styles.paddingBlockEnd) || 0
    return {
        inline: paddingInlineStart + paddingInlineEnd,
        block: paddingBlockStart + paddingBlockEnd,
    }
}
