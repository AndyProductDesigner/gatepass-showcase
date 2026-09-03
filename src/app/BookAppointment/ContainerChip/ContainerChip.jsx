'use client';

import { X } from 'lucide-react';

import './ContainerChip.css';

const SPECIAL_EQUIPMENT_LABELS = {
  reefer: 'Reefer',
  hazardous: 'Hazardous',
  over_dimension: 'Over Dimension',
};

function formatSpecialEquipment(equipment = []) {
  return equipment
    .map((value) => SPECIAL_EQUIPMENT_LABELS[value] ?? value)
    .join(' · ');
}

export default function ContainerChip({
  container,
  specialEquipment = [],
  onRemove,
}) {
  const hasSpecialEquipment = specialEquipment.length > 0;

  const classNames = [
    'container-chip',
    hasSpecialEquipment ? 'container-chip--special-equipment' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames}>
      <div className="container-chip__content">
        <strong className="container-chip__number numeric">
          {container.container_number}
        </strong>

        <span className="container-chip__details">
          {[
            container.size_type,
            container.shipping_line?.name,
            formatSpecialEquipment(specialEquipment),
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
      </div>

      <button
        className="container-chip__remove"
        type="button"
        aria-label={`Remove ${container.container_number}`}
        onClick={() => onRemove(container.container_number)}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </article>
  );
}
