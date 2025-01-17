/**
 * Store the data needed to render one heading for a group of tasks.
 */
export class GroupDisplayHeading {
    /**
     * How nested the heading is.
     *
     * 0 is the first group, meaning this heading was generated by
     * the first 'group by' instruction.
     *
     * - Level 0 will be displayed as an H4 heading - as though it were typed in markdown as '####'.
     * - Level 1 will be an H5
     * - Level 2 and above will all be H6
     */
    public readonly nestingLevel: number;

    /**
     * The text to be displayed for the group's heading.
     *
     * Note that this may contain markdown characters and should be rendered.
     */
    public readonly displayName: string;

    /**
     * Construct a {@link GroupDisplayHeading} object
     * @param {number} nestingLevel - See {@link nestingLevel} for details
     * @param {string} displayName - The text to be displayed for the group
     */
    constructor(nestingLevel: number, displayName: string) {
        this.nestingLevel = nestingLevel;
        this.displayName = displayName;
    }
}
