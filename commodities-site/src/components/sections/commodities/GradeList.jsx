import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * Grades handled for a commodity (docs/UI_UX_GUIDELINES.md §6).
 * React Bootstrap flush ListGroup: name and optional code pill above a one-line description.
 * Rows stack naturally on every screen size. No custom CSS.
 *
 * @param {{name: string, code?: string, description: string}[]} grades
 */
export default function GradeList({ grades }) {
  return (
    <ListGroup as="ul" variant="flush" className="border-top border-bottom">
      {grades.map((g) => (
        <ListGroup.Item as="li" key={g.name} className="px-0 py-4 bg-transparent">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <h3 className="fs-5 mb-0">{g.name}</h3>
            {g.code && (
              <Badge pill bg="light" text="dark" className="fw-semibold border">
                {g.code}
              </Badge>
            )}
          </div>
          <p className="text-secondary mb-0">{g.description}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
